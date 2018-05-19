<template>
  <v-container
    fluid
    :style="{ height: '100%', display: 'flex', alignItems: 'center' }">
    <v-slide-y-transition mode="out-in">
      <v-layout
        :style="{alignItems: 'center'}"
        column
        align-center>
        <strong>Ovde će biti raspored.</strong>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
export default {
  name: 'RoomLayout'
};
</script>
