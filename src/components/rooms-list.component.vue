<template>
  <div :style="{ height: '100%' }">
    <v-container
      grid-list-md
      text-xs-center
      :style="{ height: '100%' }">
        <v-list two-line :style="{ height: '100%' }">
          <template v-for="(item) in rooms">
            <v-list-tile :key="item.id" @click="selectRoom(item)">
              <v-list-tile-content>
                <v-list-tile-title>
                  {{item.faculty}} - {{item.name}}
                </v-list-tile-title>
                <v-list-tile-sub-title>
                  Broj slobodnih mesta: {{getFreeSeats(item)}}
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

export default {
  name: 'RoomsList',
  computed: {
    ...mapGetters([
      'rooms'
    ]),
    freeSeats: () => {
    }
  },
  methods: {
    getFreeSeats(room) {
      return _.flatten(room.layout).filter(isTaken => isTaken === 0).length;
    },
    selectRoom(room) {
      store.dispatch({ type: 'setSelectedRoomId', roomId: room.id });
      this.$router.push({ name: 'roomlayout' })
    }
  }
};
</script>
<style>
</style>
