import roomService from '../../api-services/room.service';

const state = {
  room: {
    layout: [
      []
    ],
    seats: [
    ]
  }
};

const getters = {
  room: (state) => state.room,
  layout: (state) => state.room.layout,
  seats: (state) => state.room.seats
};

const actions = {
  async fetchRoom({ commit }) {
    const room = await roomService.getRoom(1);
    commit('setRoom', room.data);
  }
};

const mutations = {
  setRoom(state, roomData) {
    state.room = roomData;
  }
};

export {
  actions,
  state,
  getters,
  mutations
};
