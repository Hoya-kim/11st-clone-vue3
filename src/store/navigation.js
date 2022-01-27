export default {
  namespaced: true, // 모듈에서 필수 옵션
  state: () => ({
    isShow: false,
  }),
  getters: {

  },
  mutations: {
    setState(state, payload) {
      Object.keys(payload).forEach(key => {
        state[key] = payload[key]
      })
    },
  },
  actions: {
    onNav({ commit }) { // context : { state, getters, commit, dispatch }
      commit('setState', { isShow: true })
    },
    offNav({ commit }) {
      commit('setState', { isShow: false })
    },
  },
}
