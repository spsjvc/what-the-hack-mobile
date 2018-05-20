<template>
  <div id="base"
    :style="{ height: '100%' }">
    <v-navigation-drawer
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      persistent
      enable-resize-watcher
      fixed
      app
    >
      <v-list>
        <v-list-tile
          v-for="(item, i) in items"
          :key="i"
          value="true"
          :to="item.to"
        >
          <v-list-tile-content v-if="item.isLink">
            <v-list-tile-title v-text="item.title"/>
          </v-list-tile-content>
          <v-btn v-if="!item.isLink" @click="item.action">{{item.title}}</v-btn>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      :clipped-left="clipped"
      app
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"/>
      <v-toolbar-title v-text="title"/>
      <v-spacer/>
    </v-toolbar>
    <router-view />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import store from 'Store';
import authService from '../api-services/auth.service';

export default {
  name: 'Base',
  mounted() {
    store.dispatch('fetchRooms');
  },
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          title: 'Moj QR kod',
          isLink: true,
          to: {
            name: 'qrview'
          }
        },
        {
          title: 'Čitaonice',
          isLink: true,
          to: {
            name: 'roomslist'
          }
        },
        {
          title: 'Moje rezervacije',
          isLink: true,
          to: {
            name: 'myreservations'
          }
        },
        {
          title: 'Izloguj me',
          isLink: false,
          action: () => {
            authService.logout();
          }
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Pametna čitaonica'
    };
  }
};
</script>

<style lang="scss">
#base {
  margin-top: 60px;
}
</style>
