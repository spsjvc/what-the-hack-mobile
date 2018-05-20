<template>
  <div :style="{ height: '100%' }">
    <v-container
      grid-list-md
      :style="{ height: '100%', display: 'flex', alignItems: 'center' }">
        <div :style="{ width: '100%' }" v-if="isLoadingReservations" >
          <v-progress-circular :size="70" :width="7" indeterminate color="blue" />
        </div>
        <div :style="{ width: '100%' }" v-if="!isLoadingReservations && reservations.length === 0">
          <strong>Nemate rezervacija</strong>
        </div>
        <v-list v-if="!isLoadingReservations && reservations.length !== 0" two-line :style="{ height: '100%', width: '100%' }">
          <template v-for="(item) in reservations">
            <v-list-tile :key="item.id">
              <v-list-tile-content>
                <v-list-tile-title>
                  Rezervacija u <strong>{{getRoomName(item.room_id)}} ({{getRoomFaculty(item.room_id)}})</strong>
                  na mestu <strong>{{getSeatName(item.room_id)}}</strong>
                </v-list-tile-title>
                <v-list-tile-sub-title>
                  Od <strong>{{moment(item.time_start, 'YYYY-MM-DD HH:mm:ss').format('DD.MM.YYYY. HH:mm')}}h</strong>
                  do <strong>{{moment(item.time_end, 'YYYY-MM-DD HH:mm:ss').format('DD.MM.YYYY. HH:mm')}}h</strong> <br />
                  Za učenje <strong>{{item.subject}}</strong>
                </v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import store from 'Store';
import * as _ from 'lodash'
import reservationsService from '../api-services/reservations.service';
import moment from 'moment';

export default {
  name: 'MyReservations',
  data: () => ({
    reservations: [],
    isLoadingReservations: true,
  }),
  mounted() {
    this.fetchFutureReservations();
  },
  computed: {
    ...mapGetters(['rooms'])
  },
  methods: {
    moment(data) {
      return moment(data);
    },
    async fetchFutureReservations() {
      const response = await reservationsService.getFutureReservations();
      this.reservations = response.data;
      this.isLoadingReservations = false;
    },
    getRoomName(roomId) {
      if (this.rooms.length === 0) {
        return;
      }

      return this.rooms.find(room => room.id === roomId).name;
    },
    getRoomFaculty(roomId) {
      if (this.rooms.length === 0) {
        return;
      }

      return this.rooms.find(room => room.id === roomId).faculty;
    },
    getSeatName(roomId) {
      if (this.rooms.length === 0) {
        return;
      }

      const seats = this.rooms.find(room => room.id === roomId).seats;

      console.log(seats);
      return 'test';
    }
  }
};
</script>
<style>
</style>
