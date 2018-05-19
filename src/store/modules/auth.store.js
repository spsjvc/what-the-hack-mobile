import * as _ from 'lodash';

const state = {
  activeUser: null,
  authToken: null
};

const getters = {
  activeUser: (state) => state.activeUser,
  isLogged: (state) => !_.isEmpty(state.activeUser),
  activeUserRole: (state) => state.activeUser ? state.activeUser.role : 'guest',
  authToken: (state) => state.authToken
};

const mutations = {
  deauth(state) {
    localStorage.clear();
    state.activeUser = null;
  },
  auth(state, activeUser) {
    state.activeUser = activeUser;
  },
  setAuthToken(state, authToken) {
    state.authToken = authToken;
  }
};

export {
  state,
  getters,
  mutations
};
