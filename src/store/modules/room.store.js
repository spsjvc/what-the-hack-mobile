import roomService from '../../api-services/room.service';
import websocket from '../../util/websocket';
import * as _ from 'lodash';

const state = {
  selectedRoomId: null,
  rooms: []
};

const getters = {
  rooms: (state) => state.rooms,
  layout: (state) => state.rooms.find(room => room.id === state.selectedRoomId).layout,
  seats: (state) => state.rooms.find(room => room.id === state.selectedRoomId).seats,
  selectedRoomId: (state) => state.selectedRoomId,
  selectedRoom: (state) => state.rooms.find(room => room.id === state.selectedRoomId)
};

const actions = {
  listenToPublic({ commit }) {
    websocket.subscribe('/public', (event) => {
      commit('appendRoom', event.data);
      websocket.subscribe(`/rooms/${event.data.id}`, (eventTwo) => {
        commit('updateRoom', eventTwo.data);
      });
    });
  },
  async fetchRoom({ commit }) {
    const room = await roomService.getRoom(1);
    commit('setRoom', room.data);
  },
  async fetchRooms({ commit }) {
    const rooms = await roomService.getRooms();

    rooms.data.forEach(room => {
      websocket.subscribe(`/rooms/${room.id}`, (event) => {
        commit('updateRoom', event.data);
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
  updateRoom(state, newRoom) {
    const oldRoom = state.rooms.find(room => room.id === newRoom.id);
    _.assign(oldRoom, newRoom);
  },
  appendRoom(state, newRoom) {
    state.rooms.push(newRoom);
  }
};

export {
  actions,
  state,
  getters,
  mutations
};
