const unprotectedRoutes = ['/connexion', '/inscription', '/dashboard/choisir-mon-eglise']

export const state = () => ({
  isConnected: false,
})

export const mutations = {
  LOGIN(state) {
    state.isConnected = true
  },
  LOGOUT(state) {
    state.isConnected = false
  },
}

export const actions = {
  async login({ commit }, payload) {
    const res = await this.$repositories.authentication.login(payload.email, payload.password)
    const { status, data } = res

    if (status === 200 && data.message && data.data) {
      commit('LOGIN')
      this.$router.push('/dashboard/choisir-mon-eglise')
    } else {
      commit('LOGOUT')
    }

    return res
  },
  logout({ commit }) {
    commit('LOGOUT')
  },
  checkRouteAccess({ state }, route) {
    if (state.isConnected || unprotectedRoutes.includes(route.path)) {
      return route.path
    }

    return '/connexion'
  },
  async signin({ commit }, payload) {
    const res = await this.$repositories.authentication.signin(payload)
    const { status, data } = res

    if (status === 200 && data.message && data.data) {
      commit('LOGIN')
      this.$router.push('/dashboard/choisir-mon-eglise')
    } else {
      commit('LOGOUT')
    }

    return res
  }
}

export const getters = {
  isConnected: (state) => {
    return state.isConnected
  },
}
