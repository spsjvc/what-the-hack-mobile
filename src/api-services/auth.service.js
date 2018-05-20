import Vue from 'vue';
import Axios from 'axios';
import store from 'Store';

const ENDPOINTS = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register'
};

const AUTH_HEADER = 'Authorization';

const setLocalStorageAuthData = (data) => {
  localStorage.setItem('access_token', data.access_token || null);
  localStorage.setItem('user_id', data.user ? data.user.id : null);
  localStorage.setItem('user', JSON.stringify(data.user));
};

const setAuthHeader = (unset = false) => {
  if (unset) {
    delete Axios.defaults.headers[AUTH_HEADER];
    return;
  }

  Axios.defaults.headers.authorization = 'Bearer ' + localStorage.getItem('access_token');
};

const checkLocalStorage = () => {
  const userData = JSON.parse(localStorage.getItem('user'));

  if (userData) {
    setAuthHeader();
  }

  return userData;
};

export default {
  async login(data) {
    try {
      const response = await Axios.post(ENDPOINTS.LOGIN, data);

      setLocalStorageAuthData(response.data);
      setAuthHeader();
      store.commit('auth', response.data.user);
      store.commit('setAuthToken', response.data.access_token);
      Vue.prototype.router.push({ name: 'base' });

      return response;
    } catch (error) {
      console.log(error);
    }
  },
  async logout() {
    setLocalStorageAuthData({
      access_token: null,
      user: null
    });
    setAuthHeader(true);
    store.commit('deauth');
    Vue.prototype.router.push({ name: 'login' });
  },
  async register(data) {
    const response = await Axios.post(ENDPOINTS.REGISTER, data);

    setLocalStorageAuthData(response.data);
    setAuthHeader();
    store.commit('auth', response.data.user);
    store.commit('setAuthToken', response.data.access_token);
    Vue.prototype.router.push({ name: 'base' });

    return response;
  },
  checkAuthStatus() {
    const userData = checkLocalStorage();

    if (!userData) {
      return false;
    }

    store.commit('auth', userData);
    return store.getters.activeUser;
  },
  initStoreAuth() {
    const userData = JSON.parse(localStorage.getItem('user'));
    const authToken = localStorage.getItem('access_token');

    if (userData) {
      setAuthHeader();
      store.commit('auth', userData);
      store.commit('setAuthToken', authToken);
    }

    return setAuthHeader(true);
  }
};
