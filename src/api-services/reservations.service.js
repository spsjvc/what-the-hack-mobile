import Axios from 'axios';

export default {
  getFutureReservations(id) {
    return Axios.get('/reservations/future-reservations');
  },
  createReservation(data) {
    return Axios.post('/reservations', data);
  }
};
