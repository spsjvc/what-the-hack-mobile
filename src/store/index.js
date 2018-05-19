import Vue from 'vue';
import Vuex from 'vuex';

import { auth } from './modules';

Vue.use(Vuex);

const storeData = {
  modules: {
    auth
  }
};

export default new Vuex.Store(storeData);
