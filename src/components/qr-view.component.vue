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
        <qr-code :text="authToken" />
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
import QrCode from 'vue-qrcode-component';
import { mapGetters } from 'vuex';

export default {
  name: 'QRView',
  components: {
    QrCode
  },
  computed: {
    ...mapGetters([
      'authToken'
    ])
  }
};
</script>
