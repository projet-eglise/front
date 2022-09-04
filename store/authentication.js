import moment from 'moment'

export const state = () => ({
  isConnected: false,
  token: null,
  whoami: null,
  expiration: 10000000000,
})

export const mutations = {
  LOGIN(state, token) {
    state.isConnected = true

    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = process.client
      ? decodeURIComponent(
          atob(base64)
            .split('')
            .map(function (c) {
              return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
            })
            .join('')
        )
      : Buffer.from(base64, 'base64').toString()

    state.whoami = JSON.parse(jsonPayload)
    state.token = token
    state.expiration = state.whoami.exp
    this.$cookies.set('token', token)

    delete state.whoami.exp
  },
  LOGOUT(state) {
    state.isConnected = false
    state.token = null
    state.whoami = null
    this.expiration = 1000000000000
    this.$cookies.remove('token')
  },
}

export const actions = {
  login({ commit }, token) {
    commit('LOGIN', token)
  },
  logout({ commit }) {
    commit('LOGOUT')
  },
  checkRouteAccess({ state, commit, rootGetters, dispatch }, route) {
    if (route.name === null) return rootGetters['main/referer'] === '' ? '/login' : '/error/404'

    if (!state.isConnected && this.$cookies.get('token') !== undefined) commit('LOGIN', this.$cookies.get('token'))

    if (!(route.meta !== undefined && route.meta[0] !== undefined && route.meta[0].protected !== undefined))
      return rootGetters['main/displayWelcome'] ? '/login' : '/dashboard'

    if (state.isConnected && route.meta[0].protected)
      dispatch('main/setReferer', this.app.router.currentRoute.path ?? '', { root: true })

    if (!state.isConnected && route.meta[0].protected) return '/login'

    if (state.isConnected && state.expiration - moment().format('X') <= 0) {
      // TODO Refresh token
      return '/login'
    }

    return route.path
  },
}

export const getters = {
  isConnected: (state) => state.isConnected,
  token: (state) => state.token,
  whoami: (state) => state.whoami,
}
