export default {
  namespaced: true, // 모듈에서 필수 옵션
  state: () => ({
    isShowLNB: false,
    isShowRNB: false,
  }),
  mutations: {
    updateState (state, payload) {
      Object.keys(payload).forEach(key => {
        state[key] = payload[key]
      })
    },
  },
  actions: {
    onNav ({ commit }, name) {
      commit('updateState', {
        [`isShow${name}`]: true,
      })
    },
    offNav ({ commit }, name) {
      commit('updateState', {
        [`isShow${name}`]: false,
      })
    },
  },
}
