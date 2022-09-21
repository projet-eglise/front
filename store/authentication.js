import moment from 'moment'

export const state = () => ({
  admin: {
    isConnected: false,
    token: null,
    expiration: 10000000000,
  },
  user: {
    isConnected: false,
    token: null,
    expiration: 10000000000,
  },
})

export const mutations = {
  LOGIN(state, token) {
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

    const content = JSON.parse(jsonPayload)

    const userToConnect = content.isAdmin ? state.admin : state.user

    if (content.exp - moment().format('X') <= 0) return

    userToConnect.isConnected = true
    userToConnect.token = token
    userToConnect.expiration = content.exp
    this.$cookies.set(content.isAdmin ? 'adminToken' : 'token', token)
  },
  LOGOUT(state, admin = false) {
    const userToDisconnect = admin ? state.admin : state.user
    userToDisconnect.isConnected = false
    userToDisconnect.token = null
    userToDisconnect.expiration = 1000000000000

    this.$cookies.remove(admin ? 'adminToken' : 'token')
  },
}

export const actions = {
  login({ commit }, token) {
    commit('LOGIN', token)
  },
  logout({ commit }) {
    commit('LOGOUT')
  },
  adminLogout({ commit }) {
    commit('LOGOUT', true)
  },
}

export const getters = {
  // Admin informations
  'admin/isConnected': (state) => state.admin.isConnected,
  'admin/expiration': (state) => state.admin.expiration,
  'admin/token': (state) => state.admin.token,

  // User informations
  'user/isConnected': (state) => state.user.isConnected,
  'user/expiration': (state) => state.user.expiration,
  'user/token': (state) => state.user.token,
}
