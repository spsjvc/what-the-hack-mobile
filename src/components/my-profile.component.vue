<template>
  <v-container
    fluid
    :style="{ height: '100%', display: 'flex', alignItems: 'center' }">
    <div :style="{ width: '100%' }">
      <img :src="'static/' + progress.image  + '.svg'" :style="{ width: '150px', marginBottom: '30px' }" />
      <h3>Trenutno ste {{progress.level}} nivo.</h3>
      <h4>Vaš broj poena je {{activeUser.points}}.</h4>
      <v-progress-linear :value="progress.progress" height="10" color="info"></v-progress-linear>
      <strong>{{progress.message}}</strong>
    </div>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import { levels } from '../constants';

export default {
  name: 'MyProfile',
  computed: {
    ...mapGetters(['activeUser']),
    progress() {
      const points = this.activeUser.points;

      if (points < levels[0].points) {
        return {
          level: 1,
          progress: points * 5,
          message: levels[0].message,
          image: 'first'
        };
      } else if (points < levels[1].points) {
        return {
          level: 2,
          progress: points * 2,
          message: levels[1].message,
          image: 'second'
        };
      } else {
        return {
          level: 3,
          progress: points,
          message: levels[2].message,
          image: 'third'
        };
      }
    }
  },
};
</script>
