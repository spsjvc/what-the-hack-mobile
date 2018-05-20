<template>
  <div :style="{ height: '100%' }">
    <v-container
      grid-list-md
      text-xs-center
      :style="{ height: '100%' }">
      <div class="layout-container" :style="{ height: '100%' }">
        <strong>Uživo pregled čitaonice "{{selectedRoom.name}}"</strong>
        <v-btn @click="openReservationDialog" color="primary" :style="{ marginTop: '10px', marginBottom: '10px' }">rezerviši mesto u čitaonici</v-btn>
        <div
          v-for="i in rowsCount"
          :key="`4${i}`"
          class="layout-row"
        >
          <div
            v-for="j in colsCount"
            :key="`5${i}${j}`"
            :class="[
              layout[i-1][j-1] ? 'seat-taken' : 'seat-free'
            ]"
            class="layout-seat"
            @click="seatClicked(i-1, j-1)"
          >
            <strong class="text-xs-center" :style="{ width: '100%' }">{{i}}{{alphabet[j - 1]}}</strong>
          </div>
        </div>
      </div>
      <v-dialog v-model="dialog">
        <v-card>
          <v-card-text>
            Ovo mesto je zauzeto.
            <br />Ime studenta: <strong>{{ tappedSeat ? tappedSeat.user.name : '' }}</strong>
          </v-card-text>
        </v-card>
      </v-dialog>
      <v-dialog v-model="successfullyCreatedDialog">
        <v-card>
          <v-card-text>
            Uspešno ste kreirali rezervaciju!
          </v-card-text>
        </v-card>
      </v-dialog>
       <v-dialog
        v-model="reservationDialog"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
        scrollable
      >
      <v-card :style="{ display: 'flex', alignItems: 'center' }">
        <v-toolbar card dark color="primary">
          <v-btn icon dark @click="resetReservation">
          <v-icon>close</v-icon>
        </v-btn>
        <v-toolbar-title>Nova rezervacija</v-toolbar-title>
        </v-toolbar>
        <div class="center-picker" v-if="createReservationStep === 1">
          <strong>Izaberi datum za rezervaciju: </strong>
          <v-date-picker
            full-width
            :min="moment().subtract(1, 'days').format()"
            :max="moment().add(2, 'days').format()"
            v-model="datePicker"
          />
          <v-btn :disabled="!datePicker" @click="incrementStep" color="primary" :style="{ marginTop: '10px', marginBottom: '10px' }">sledeći korak</v-btn>
        </div>
        <div class="center-picker" v-if="createReservationStep === 2">
          <strong>Izaberi vreme početka rezervacije: </strong>
          <v-time-picker
            format="24hr"

            v-model="startTimePicker"
            :style="{ width: '100%' }"
          />
          <v-btn :disabled="!startTimePicker" @click="incrementStep" color="primary" :style="{ marginTop: '10px', marginBottom: '10px' }">sledeći korak</v-btn>
        </div>
        <div class="center-picker" v-if="createReservationStep === 3">
          <strong>Izaberi vreme kraja rezervacije: </strong>
          <v-time-picker
            format="24hr"

            v-model="endTimePicker"
            :style="{ width: '100%' }"
          />
          <v-btn :disabled="!endTimePicker" @click="showFreeSeats" color="primary" :style="{ marginTop: '10px', marginBottom: '10px' }">prikaži slobodna mesta</v-btn>
        </div>
        <div v-if="createReservationStep === 4" :style="{ width: '100%', height: '100%' }">
          <div class="layout-container" :style="{ height: '100%' }">
            <v-btn :disabled="Object.keys(choosenSeat).length === 0" @click="incrementStep" color="primary" :style="{ marginTop: '10px', marginBottom: '10px' }">sledeći korak</v-btn>
            <div
              v-for="i in rowsCount"
              :key="`4${i}`"
              class="layout-row"
            >
              <div
                v-for="j in colsCount"
                :key="`5${i}${j}`"
                :class="[
                  availableSeatsLayout[i-1][j-1] ? 'seat-taken' : 'seat-free',
                  isSelected(i-1,j-1) ? 'seat-booked' : ''
                ]"
                class="layout-seat"
                @click="seatClicked(i-1, j-1)"
              >
                <strong class="text-xs-center" :style="{ width: '100%' }">{{i}}{{alphabet[j - 1]}}</strong>
              </div>
            </div>
          </div>
        </div>
        <div v-if="createReservationStep === 5" :style="{ width: '90%', marginTop: '20%' }">
          <strong>Unesite predmet koji učite (opciono):</strong>
          <v-form>
            <v-text-field
              v-model="subject"
              name="subject"
              type="text"
            />
          </v-form>
          <v-btn @click="reserveSeat" color="primary" :style="{ marginTop: '10px', marginBottom: '10px' }">rezerviši</v-btn>
        </div>
      </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import store from 'Store';
import * as _ from 'lodash';
import moment from 'moment';
import roomService from '../api-services/room.service';
import reservationsService from '../api-services/reservations.service';

export default {
  name: 'RoomLayout',
  data: () => ({
    choosenSeat: {},
    tappedSeat: null,
    dialog: false,
    datetime: null,
    datePicker: null,
    startTimePicker: null,
    endTimePicker: null,
    reservationDialog: false,
    createReservationStep: 1,
    availableSeatsMatrix:[[]],
    availableSeatsLayout: [[]],
    successfullyCreatedDialog: false,
    subject: null,
    alphabet: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
  }),
  computed: {
    ...mapGetters(['seats', 'layout', 'selectedRoom', 'activeUser']),
    rowsCount() {
      return this.layout.length;
    },
    colsCount() {
      return this.layout[0].length;
    },
    seatsMatrix() {
      return _.chunk(this.seats, 5)
    },
  },
  methods: {
    resetReservation() {
      this.datePicker = null;
      this.timePicker = null;
      this.reservationDialog = false;
      this.createReservationStep = 1;
      this.choosenSeat = {};
      this.tappedSeat = null;
    },
    moment: () => {
      return moment();
    },
    openReservationDialog() {
      this.reservationDialog = true;
    },
    reserveSeat() {
      const seatId = this.seatsMatrix[this.choosenSeat.x][this.choosenSeat.y].id;
      const userId = this.activeUser.id;

      reservationsService.createReservation({
        user_id: userId,
        seat_id: seatId,
        subject: this.subject,
        time_start: this.datePicker + ' ' + this.startTimePicker,
        time_end: this.datePicker + ' ' + this.endTimePicker,
      }).then(response => {
        this.reservationDialog = false;
        this.resetReservation();
        this.successfullyCreatedDialog = true;;
      })
    },
    selectSeat(i, j) {
      if (this.choosenSeat.x === i && this.choosenSeat.y === j) {
        this.choosenSeat = {};
        return;
      }

      if (!this.availableSeatsLayout[i][j]) {
        this.choosenSeat = { x: i, y: j };
      }
    },
    isSelected(i, j) {
      return this.choosenSeat.x === i && this.choosenSeat.y === j;
    },
    seatClicked(i, j) {
      if (!this.reservationDialog) {
        if (this.layout[i][j] === 1) {
          this.tappedSeat = this.seatsMatrix[i][j];
          this.dialog = !this.dialog;
        }

        return;
      }

      this.selectSeat(i, j);
      this.$forceUpdate();

      if (this.availableSeatsLayout[i][j]) {
        this.tappedSeat = this.availableSeatsMatrix[i][j];
        this.dialog = !this.dialog;
      }
    },
    incrementStep() {
      this.createReservationStep++;
    },
    showFreeSeats() {
      roomService.getAvailableSeats({
        room_id: this.selectedRoom.id,
        time_start: this.datePicker + ' ' + this.startTimePicker,
        time_end: this.datePicker + ' ' + this.endTimePicker,
      }).then(response => {
        const availableSeatsResponse = response.data;

        roomService.getTakenSeats({
          room_id: this.selectedRoom.id,
          time_start: this.datePicker + ' ' + this.startTimePicker,
          time_end: this.datePicker + ' ' + this.endTimePicker,
        }).then(secondResponse => {
          const takenSeatsResponse = secondResponse.data;
          const availableSeatsIds = availableSeatsResponse.map(seat => seat.id);
          const unchunkedAvailableSeatsLayout = this.seats.map(seat => {
            return availableSeatsIds.includes(seat.id) ? 0 : 1;
          });

          const takenSeatsIds = takenSeatsResponse.map(seat => seat.id);

          const availableSeatsMatrix = this.seats.map(seat => {
            if (!availableSeatsIds.includes(seat.id)) {
              return takenSeatsResponse.find(s => s.id === seat.id);
            }

            return availableSeatsResponse.find(s => s.id === seat.id);
          })

          this.availableSeatsMatrix = _.chunk(availableSeatsMatrix, 5);
          this.availableSeatsLayout = _.chunk(unchunkedAvailableSeatsLayout, 5);

          this.incrementStep();
        });
      });
    }
  },
};
</script>
<style>
.layout-container {
  height: 70vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px;
}
.layout-row {
  display: flex;
  flex-grow: 1;
  justify-content: flex-start;
  align-items: stretch;
}
.layout-row:first-child {
  padding-top: 4px;
}
.layout-row:last-child {
  padding-bottom: 4px;
}
.layout-seat {
  flex: 1;
  margin: 5px 5px 5px 5px;
  border-radius: 10px;
  color: white;
  align-items: center;
  display: flex;
}
.seat-taken {
  background: #D81159;
}
.seat-booked {
  background: #FFBC42 !important;
}
.seat-free {
  background: #218380;
}
.layout-admin-panel {
  position: absolute;
  left: 0;
  bottom: 0;
}
.picker__body {
  margin: auto;
}
.center-picker {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
}
</style>
