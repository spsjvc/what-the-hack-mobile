import Vue from 'vue';
import Vuex from 'vuex';

import { auth, room } from './modules';

Vue.use(Vuex);

const storeData = {
  modules: {
    auth, room
  }
};

export default new Vuex.Store(storeData);
