<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout
        column
        align-center>
        <qr-code :text="token" />
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
import QrCode from 'vue-qrcode-component';

export default {
  name: 'QRPage',
  components: {
    QrCode
  },
  data() {
    return {
      token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3RcL2FwaVwvYXV0aFwvcmVnaXN0ZXIiLCJpYXQiOjE1MjY3MTUyNzIsIm5iZiI6MTUyNjcxNTI3MiwianRpIjoiOUJLSElJUzhMUVZxZnAxViIsInN1YiI6MywicHJ2IjoiODdlMGFmMWVmOWZkMTU4MTJmZGVjOTcxNTNhMTRlMGIwNDc1NDZhYSJ9.b-DPFw_xB4vIM46Bznr8PqZyFcv4Gti2fzhKwAxphhU'
    };
  }
};
</script>
