import roomService from '../../api-services/room.service';
import websocket from '../../util/websocket';

const state = {
  selectedRoomId: null,
  rooms: []
};

const getters = {
  rooms: (state) => state.rooms,
  layout: (state) => state.rooms.filter(room => room.id === state.selectedRoomId)[0].layout,
  seats: (state) => state.rooms.filter(room => room.id === state.selectedRoomId)[0].seats,
  selectedRoomId: (state) => state.room.selectedRoomId
};

const actions = {
  async fetchRoom({ commit }) {
    const room = await roomService.getRoom(1);
    commit('setRoom', room.data);
  },
  async fetchRooms({ commit }) {
    const rooms = await roomService.getRooms();

    rooms.data.forEach(room => {
      websocket.subscribe(`/rooms/${room.id}`, (event) => {
        commit('updateRoom', room.id, event.data);
      });
    });

    commit('setRooms', rooms.data);
  },
  setSelectedRoomId({ commit }, { roomId }) {
    commit('setSelectedRoomId', roomId);
  }
};

const mutations = {
  setRoom(state, roomData) {
    state.room = roomData;
  },
  setRooms(state, roomsData) {
    state.rooms = roomsData;
  },
  setSelectedRoomId(state, selectedRoomId) {
    state.selectedRoomId = selectedRoomId;
  },
  updateRoom(state, roomId, newRoom) {
    state.rooms = state.rooms.filter(room => room.id !== roomId).concat[newRoom];
  }
};

export {
  actions,
  state,
  getters,
  mutations
};
