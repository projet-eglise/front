export const state = () => ({
  displayWelcome: true,
})

export const mutations = {
  WELCOME_DISPLAYED(state) {
    state.displayWelcome = false
  },
}

export const actions = {
  welcomeDisplayed({ commit }) {
    commit('WELCOME_DISPLAYED')
  },
}

export const getters = {
  displayWelcome: (state) => {
    return state.displayWelcome
  },
}
