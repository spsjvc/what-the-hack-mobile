<template>
  <v-container
    fluid
    :style="{ height: '100%', display: 'flex', alignItems: 'center' }">
    <v-slide-y-transition mode="out-in">
      <v-layout
        :style="{alignItems: 'center'}"
        column
        align-center>
        <strong>Vaš QR kod:</strong><br />
        <vue-qrcode :value="authToken" :options="{ size: QRWidth }" />
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
import VueQrcode from '@xkeshi/vue-qrcode'
import { mapGetters } from 'vuex';

export default {
  name: 'QRView',
  components: {
    VueQrcode
  },
  data() {
    return {
      QRWidth: null
    };
  },
  computed: {
    ...mapGetters([
      'authToken'
    ])
  },
  created() {
    this.QRWidth = window.innerWidth * 0.8;
  }
};
</script>
