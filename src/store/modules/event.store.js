const state = {
  event: null
};

const getters = {
  event: (state) => state.event
};

const actions = {
  setEvent({ commit }, { event }) {
    commit('setEventMutation', event);
  }
};

const mutations = {
  setEventMutation(state, newEvent) {
    state.event = newEvent;
    clearTimeout(this.timeout);

    this.timeout = setTimeout(() => {
      state.event = null;
    }, 5000);
  }
};

export {
  actions,
  state,
  getters,
  mutations
};
