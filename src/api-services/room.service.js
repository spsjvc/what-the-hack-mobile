import Axios from 'axios';

export default {
  getRoom(id) {
    return Axios.get('/rooms/' + id);
  },
  getRooms() {
    return Axios.get('/rooms');
  }
};
