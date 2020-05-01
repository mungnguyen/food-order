<template>
  <v-app class="food-order">
    <Header />

    <Navigation />

    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Header from "@/components/layout/user/Header";
import Navigation from "@/components/layout/user/Navigation";
export default {
  components: {
    Header,
    Navigation
  }
};
</script>