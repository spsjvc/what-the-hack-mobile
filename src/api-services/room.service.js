import Axios from 'axios';

export default {
  getRoom(id) {
    return Axios.get('/rooms/' + id);
  },
  getRooms() {
    return Axios.get('/rooms');
  },
  getAvailableSeats(data) {
    return Axios.post('/reservations/get-available-seats', data);
  },
  getTakenSeats(data) {
    return Axios.post('/reservations/get-taken-seats', data);
  }
};
