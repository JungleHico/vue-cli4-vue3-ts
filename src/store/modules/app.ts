const app = {
  state: {
    // 侧边栏是否收起
    collapsed: (sessionStorage.getItem('collapsed') && sessionStorage.getItem('collapsed') === 'true') || false
  },
  mutations: {
    SET_COLLAPSED (state: any, collapsed: boolean) {
      sessionStorage.setItem('collapsed', collapsed + '')
      state.collapsed = collapsed
    }
  },
  actions: {
    SetCollapsed ({ commit }: { commit: any }, collapsed: boolean) {
      commit('SET_COLLAPSED', collapsed)
    }
  }
}

export default app
