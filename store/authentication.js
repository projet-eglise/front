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
    if (!state.isConnected && this.$cookies.get('token') !== undefined) {
      commit('LOGIN', this.$cookies.get('token'))
    }

    if (!(route.meta !== undefined && route.meta[0] !== undefined && route.meta[0].protected !== undefined)) {
      if (rootGetters['main/displayWelcome']) return '/connexion'
      return '/erreur/404'
    }

    if (state.isConnected || !route.meta[0].protected) {
      if(state.isConnected && state.expiration - moment().format('X') <= 0 ) {
        dispatch('main/setReferer', this.app.router.currentRoute.path, {root: true})
        return '/connexion'
      }

      return route.path
    }

    return '/connexion'
  },
  async signin({ commit }, payload) {
    const res = await this.$repositories.authentication.signin(payload)
    const { status, data } = res

    if (status === 200 && data.message && data.data && data.data.token) {
      commit('LOGIN', data.data.token)
      this.$router.push('/eglise/creer-ou-rejoindre')
    } else {
      commit('LOGOUT')
    }

    return res
  },
}

export const getters = {
  isConnected: (state) => state.isConnected,
  token: (state) => state.token,
  whoami: (state) => state.whoami,
}
