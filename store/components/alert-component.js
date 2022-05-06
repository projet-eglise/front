export const state = () => ({
  message: 'Erreur ...',
  display: false,
  type: 'error',
})

export const mutations = {
  DISPLAY(state) {
    state.display = true
  },
  HIDE(state) {
    state.display = false
  },
  ERROR_TYPE(state) {
    state.type = 'error'
  },
  SET_MESSAGE(state, message) {
    state.message = message
  },
}

export const actions = {
  displayError({ commit }, message) {
    commit('SET_MESSAGE', message)
    commit('ERROR_TYPE')
    commit('DISPLAY')
  },
  hide({ commit }) {
    commit('HIDE')
  },
}

export const getters = {
  message: (state) => state.message,
  display: (state) => state.display,
  type: (state) => state.type,
}
