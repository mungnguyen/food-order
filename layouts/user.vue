<template>
  <v-app class="food-order">
    <Header />

    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Header from "@/components/layout/user/Header";
export default {
  components: {
    Header,
  }
};
</script>