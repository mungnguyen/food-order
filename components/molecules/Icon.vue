<template>
  <v-tooltip top>
    <template v-slot:activator="{ on }">
      <v-icon
        @click="$emit('click')"
        :color="color"
        dark
        v-on="on"
        style="cursor: pointer"
      >{{ icon }}</v-icon>
    </template>
    <span>{{ content }}</span>
  </v-tooltip>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: ""
    },

    icon: {
      type: String,
      required: true
    },

    content: {
      type: String,
      required: true
    }
  }
};
</script>