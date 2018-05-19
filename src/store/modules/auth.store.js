import * as _ from 'lodash';

const state = {
  activeUser: null
};

const getters = {
  activeUser: (state) => state.activeUser,
  isLogged: (state) => !_.isEmpty(state.activeUser),
  isAdmin: (state, getters) => getters.isLogged && state.activeUser.isAdmin(),
  activeUserRole: (state) => state.activeUser ? state.activeUser.role : 'guest'
};

const mutations = {
  deauth(state) {
    localStorage.clear();
    state.activeUser = null;
  },
  auth(state, activeUser) {
    state.activeUser = activeUser;
  }
};

export {
  state,
  getters,
  mutations
};
