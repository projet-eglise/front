export const state = () => ({
  name: '',
  uid: '',
})

export const mutations = {
  SET_CHURCH(state, payload) {
    state.name = payload.name
    state.uid = payload.uid
  },
}

export const actions = {
  setChurchWithUid({ commit, rootGetters }, payload) {
    const churches = rootGetters['authentication/whoami'].churches
    for (const key in churches) {
      if (churches[key].uid === payload) {
        commit('SET_CHURCH', churches[key])
      }
    }
  },

  clearChurch({ commit }) {
    commit('SET_CHURCH', { name: '', uid: '' })
  },
}

export const getters = {
  get: (state) => state,
}
