<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Vuetify</span>
        <span class="font-weight-light">MATERIAL DESIGN</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn flat href="https://github.com/vuetifyjs/vuetify/releases/latest" target="_blank">
        <span class="mr-2">Latest Release</span>
      </v-btn>
    </v-toolbar>

    <v-content>
      <app-navigation-drawer/>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import NavigationDrawer from './components/NavigationDrawer';

export default {
  name: 'App',
  components: {
    appNavigationDrawer: NavigationDrawer
  },
  data() {
    return {
      //
    };
  },

  created() {
    this.addTouchListener();
  },

  methods: {
    addTouchListener() {
      window.addEventListener('touchstart', () => {
        if (!this.$store.state.isTouchDevice) {
          this.$store.commit('setTouchDevice');
        }
      });
    }
  }
};
</script>

<style>
.table-row:hover .row-actions {
  display: flex;
}

.row-actions {
  position: absolute;
  right: 0;
  background: inherit;
  display: none;
  z-index: 2;
}

.actions-column {
  padding: 0 8px;
  text-align: right;
  white-space: nowrap;
}
</style>

