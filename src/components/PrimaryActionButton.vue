<template>
  <v-scale-transition origin="center">
    <v-btn fab bottom right color="primary" fixed @click.stop="$emit('click')">
      <v-icon color="secondary">{{ icon }}</v-icon>
    </v-btn>
  </v-scale-transition>
</template>

<script>
export default {
  name: "PrimaryActionButton",

  props: {
    icon: {
      type: String,
      default: "add"
    }
  }
};
</script>
