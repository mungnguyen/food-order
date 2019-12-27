<template>
  <v-app class="food-order">
    <AdminHeader />
    <Navigation />

    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import AdminHeader from "../components/layout/admin/AdminHeader";
import Navigation from "@/components/layout/admin/Navigation";

export default {
  components: {
    AdminHeader,
    Navigation
  }
};
</script>
