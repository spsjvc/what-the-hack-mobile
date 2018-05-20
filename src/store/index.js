import Vue from 'vue';
import Vuex from 'vuex';

import { auth, room, event } from './modules';

Vue.use(Vuex);

const storeData = {
  modules: {
    auth, room, event
  }
};

export default new Vuex.Store(storeData);
