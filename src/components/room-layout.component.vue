<template>
  <div :style="{ height: '100%' }">
    <v-container
      grid-list-md
      text-xs-center
      :style="{ height: '100%' }">
      <div class="layout-container" :style="{ height: '90%' }">
        <div
          v-for="i in rowsCount"
          :key="`4${i}`"
          class="layout-row"
        >
          <div
            v-for="j in colsCount"
            :key="`5${i}${j}`"
            :class="[
              layout[i-1][j-1] ? 'seat-taken' : 'seat-free',
              isSelected(i-1,j-1) ? 'seat-booked' : ''
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
            Ovo mesto je trenutno zauzeto.
            <br />Ime studenta: <strong>{{ tappedSeat ? tappedSeat.user.name : '' }}</strong>
          </v-card-text>
        </v-card>
      </v-dialog>
      <v-btn color="primary" :style="{ marginTop: '2.5%' }">REZERVIŠI MESTO</v-btn>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import store from 'Store';
import * as _ from 'lodash'

export default {
  name: 'RoomLayout',
  data: () => ({
    choosenSeat: {},
    tappedSeat: null,
    dialog: false,
    alphabet: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
  }),
  computed: {
    ...mapGetters(['seats', 'layout']),
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
    selectSeat(i, j) {
      if (this.choosenSeat.x === i && this.choosenSeat.y === j) {
        this.choosenSeat = {};
        return;
      }

      if (!this.layout[i][j]) {
        this.choosenSeat = { x: i, y: j };
      }
    },
    isSelected(i, j) {
      return this.choosenSeat.x === i && this.choosenSeat.y === j;
    },
    seatClicked(i, j) {
      this.selectSeat(i, j);
      this.$forceUpdate();

      if (this.layout[i][j]) {
        this.tappedSeat = this.seatsMatrix[i][j];
        this.dialog = !this.dialog;
      }
    },
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
</style>
