import * as _ from 'lodash';
import websocket from '../../util/websocket';
import authService from '../../api-services/auth.service';
import store from 'Store';

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
  setActiveUser(state, activeUser) {
    state.activeUser = activeUser;
  },
  auth(state, activeUser) {
    state.activeUser = activeUser;

    websocket.subscribe('/public', (event) => {
      console.log(event);
      if (
        event.event === 'socket.user.experience_change' &&
        event.data.user.id === state.activeUser.id
      ) {
        const newPoints = event.data.user.points;
        const oldPoints = newPoints + getPointsForEvent(event.data.event);

        if (oldPoints < 20 && newPoints >= 20) {
          store.dispatch({ type: 'setEvent', event: 'LEVEL_UP_TWO' });
        } else if (oldPoints < 50 && newPoints >= 50) {
          store.dispatch({ type: 'setEvent', event: 'LEVEL_UP_THREE' });
        } else {
          store.dispatch({ type: 'setEvent', event: event.data.event });
        }

        store.commit('setActiveUser', event.data.user);
        authService.updateUserInLocalStorage(event.data.user);
      }
    });
  },
  setAuthToken(state, authToken) {
    state.authToken = authToken;
  }
};

const getPointsForEvent = (event) => {
  switch (event) {
    case 'USER_DID_NOT_SHOW_UP':
      return -5;
    case 'USER_DID_NOT_LOGOUT_ON_TIME':
      return -2;
    case 'USER_LOGGED_OUT_EARLIER':
      return -3;
    case 'USER_LOGGED_IN':
      return 5;
    case 'USER_LOGGED_OUT_ON_TIME':
      return 5;
    default:
      return 0;
  }
};

export {
  state,
  getters,
  mutations
};
