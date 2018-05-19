// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import Axios from 'axios';
import router from './router';
import VueCordova from 'vue-cordova';
import Vuetify from 'vuetify';
import VeeValidate from 'vee-validate';
import store from './store';

import { API_BASE_URL } from './constants';
import authService from './api-services/auth.service';
import websocket from './util/websocket';

Vue.config.productionTip = false;

Vue.use(VueCordova);
Vue.use(Vuetify);
Vue.use(VeeValidate);

Vue.prototype.router = router;

Axios.defaults.baseURL = API_BASE_URL;
Axios.defaults.headers.Accept = 'application/json';
Axios.defaults.headers['Access-Control-Allow-Origin'] = '*';

authService.initStoreAuth();

websocket.initialize();

// add cordova.js only if serving the app through file://
if (window.location.protocol === 'file:' || window.location.port === '3000') {
  const cordovaScript = document.createElement('script');
  cordovaScript.setAttribute('type', 'text/javascript');
  cordovaScript.setAttribute('src', 'cordova.js');
  document.body.appendChild(cordovaScript);
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
