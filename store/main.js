export const state = () => ({
  displayWelcome: true,
  referer: '',
})

export const mutations = {
  WELCOME_DISPLAYED(state) {
    state.displayWelcome = false
  },
  SET_REFERER(state, referer) {
    state.referer = referer
  },
}

export const actions = {
  welcomeDisplayed({ commit }) {
    commit('WELCOME_DISPLAYED')
  },
  setReferer({commit}, referer) {
    commit('SET_REFERER', referer)
  }
}

export const getters = {
  displayWelcome: (state) => state.displayWelcome,
  referer: (state) => state.referer,
}
