<template>
  <v-navigation-drawer
    :clipped="$vuetify.breakpoint.lgAndUp"
    fixed
    app
  >
    <div v-if="$vuetify.breakpoint.mdAndDown" class="ma-3">
      <img
        src="/logo.svg"
        height="30"
        class="clickable"
      >
    </div>
    <v-list dense>
      <template v-for="item in menuItems">
        <v-divider v-if="item.divider"/>
        <v-list-tile
          v-else-if="!item.children && ($can(item.permissions) || item.isPublic)"
          :prepend-icon="item.icon"
          :key="item.text"
          :to="item.route"
          :disabled="!item.route"
          ripple
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.text }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-group
          v-else-if="$can(item.permissions) || item.isPublic"
          v-model="item.expanded"
          :key="item.text"
          :prepend-icon="item.icon"
        >
          <v-list-tile slot="activator">
            <v-list-tile-content>
              <v-list-tile-title>{{ item.text }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <div v-for="(child, i) in item.children" :key="i">
            <template v-if="!child.grandchildren">
              <v-divider v-if="child.divider"/>
              <v-list-tile
                v-if="!child.permissions || $can(child.permissions)"
                :key="i"
                :to="child.route"
                :disabled="!child.route"
                ripple
              >
                <v-list-tile-action>
                  <div></div>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>{{ child.text }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>
          </div>
        </v-list-group>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'NavigationDrawer',

  computed: {
    menuItems() {
      return [
        {
          icon: 'business',
          text: 'Documents',
          expanded: this.$route.meta.menuGroup === 'documents',
          permissions: ['documents.*'],
          children: [
            {
              text: 'Contracts',
              route: '/documents/contracts',
              permissions: ['documents.*']
            }
          ]
        }
      ];
    }
  }
};
</script>
