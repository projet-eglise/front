export const state = () => ({
  isConnected: false,
  token: null,
  whoami: null,
})

export const mutations = {
  LOGIN(state, token) {
    state.isConnected = true

    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    state.whoami = JSON.parse(jsonPayload)
    state.token = token
  },
  LOGOUT(state) {
    state.isConnected = false
  },
}

export const actions = {
  async login({ commit }, payload) {
    const res = await this.$repositories.authentication.login(payload.email, payload.password)
    const { status, data } = res

    if (status === 200 && data.message && data.data && data.data.token) {
      commit('LOGIN', data.data.token)
      this.$router.push('/connexion/choisir-mon-eglise')
    } else {
      commit('LOGOUT')
    }

    return res
  },
  logout({ commit }) {
    commit('LOGOUT')
  },
  checkRouteAccess({ state }, route) {
    if (state.isConnected || !route.meta[0].protected) {
      return route.path
    }

    return '/connexion'
  },
  async signin({ commit }, payload) {
    const res = await this.$repositories.authentication.signin(payload)
    const { status, data } = res

    if (status === 200 && data.message && data.data) {
      commit('LOGIN')
      this.$router.push('/connexion/choisir-mon-eglise')
    } else {
      commit('LOGOUT')
    }

    return res
  },
}

export const getters = {
  isConnected: (state) => state.isConnected,
  token: (state) => state.token,
}
