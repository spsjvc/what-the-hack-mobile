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
        <qr-code :text="token" />
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
import QrCode from 'vue-qrcode-component';

export default {
  name: 'QRView',
  components: {
    QrCode
  },
  data() {
    return {
      token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwcnYiOiI5ZjhhMjM4OWEyMGNhMDc1MmFhOWU5NTA5MzUxNTUxN2U5MGUxOTRjIiwidXNlciI6eyJpZCI6MX19.EnWdyS9wFY-V7ezqjITgRQpf3oEr3fKacABxNCQ7unw'
    };
  }
};
</script>
