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
import Header from "@/components/layout/store/Header";
import Navigation from "@/components/layout/store/Navigation";
export default {
  components: {
    Header,
    Navigation
  }
};
</script>