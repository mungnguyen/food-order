<template>
  <v-app>
    <v-content></v-content>
  </v-app>
</template>

<script>
import AdminHeader from "@/components/layout/admin/AdminHeader";
import Navigation from "@/components/layout/admin/Navigation";

export default {
  layout: "admin",
  middleware: "adminAuth",
  data() {
    return {
      drawer: true
    };
  },
  components: {
    AdminHeader,
    Navigation
  }
};
</script>
