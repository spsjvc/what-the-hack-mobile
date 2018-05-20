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
      <v-list
        :style="{ marginTop: '20px' }">
        <v-list-tile
          v-for="(item, i) in items"
          :key="i"
          value="true"
          :to="item.to"
        >
          <v-list-tile-content v-if="item.isLink">
            <v-list-tile-title v-text="item.title"/>
          </v-list-tile-content>
          <v-btn
            v-if="!item.isLink"
            @click="item.action"
            :style="{
              backgroundColor: 'white',
              margin: '0px',
              color: 'black',
              fontSize: '1.5rem',
              textTransform: 'none',
              webkitBoxShadow: 'none'
            }"
          >
            {{item.title}}
          </v-btn>
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
      <v-dialog v-model="hasEvent">
        <v-card>
          <v-card-text>
            {{messageForEvent}}
          </v-card-text>
        </v-card>
      </v-dialog>
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
    store.dispatch('listenToPublic');
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
          title: 'Moj profil',
          isLink: true,
          to: {
            name: 'myprofile'
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
  },
  computed: {
    ...mapGetters(['event']),
    hasEvent() {
      return this.event !== null;
    },
    messageForEvent() {
      if (this.event === null) {
        return;
      }

      switch (this.event) {
        case 'USER_LOGGED_IN':
          return 'Čestitamo! Dobili ste pet poena za dolazak na vreme!';
        case 'USER_LOGGED_OUT_ON_TIME':
          return 'Čestitamo! Dobili ste pet poena jer ste ispoštovali vreme za izlazak.';
        case 'USER_DID_NOT_SHOW_UP':
          return 'Ups! Izgubili ste pet poena jer niste došli na vreme za rezervaciju.';
        case 'USER_DID_NOT_LOGOUT_ON_TIME':
          return 'Ups! Izgubili ste dva poena jer se niste odjavili iz čitaonice na vreme.';
        case 'USER_LOGGED_OUT_EARLIER':
          return 'Ups! Izgubili ste tri poena jer ste se odjavili više od 30min ranije.'
        case 'LEVEL_UP_TWO':
          return 'Opa! Bravo! Dostigli ste 2. nivo i otključali rezervisanje do 7 dana unapred!';
        case 'LEVEL_UP_THREE':
          return 'Opa! Bravo! Dostigli ste 3. nivo i otključali rezervacije dužine do 10h dnevno!';
        default:
          console.log(this.event);
          return 'Invalid event.'
      }
    }
  }
};
</script>

<style lang="scss">
#base {
  margin-top: 60px;

  .list__tile__title {
    font-size: 1.5rem;
    color: black;
  }

  .btn__content {
    padding: 0;
  }
}
</style>
