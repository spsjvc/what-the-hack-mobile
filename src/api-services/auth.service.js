import Axios from 'axios';

const PREFIX = 'auth/';
const ENDPOINTS = {
  LOGIN: 'login/',
  REGISTER: 'register/'
};

export default {
  login: (data) => (
    Axios.post(`${PREFIX}${ENDPOINTS.LOGIN}`, data)
  ),
  register: (data) => (
    Axios.post(`${PREFIX}${ENDPOINTS.REGISTER}`, data)
  )
};
