<template>
  <v-app-bar app clipped-left color="#000" class="custom-header">
    <v-app-bar-nav-icon style="color: #fff" @click="drawer = !drawer" />
    <span class="title ml-3 mr-5" style="color: #fff">
      B-
      <span style="color: #e49f02">O</span>RDER&nbsp;
    </span>

    <v-text-field
      background-color="#fff"
      solo-inverted
      rounded
      flat
      light
      hide-details
      label="Search"
      prepend-inner-icon="mdi-magnify"
    />
    <v-spacer />
    <v-toolbar-items>
      <v-menu bottom left offset-y nudge-top="-8%" dense>
        <template v-slot:activator="{ on }">
          <v-btn background-color="black" icon v-on="on">
            <span>Admin</span>
            <v-icon color="white">mdi-account-circle</v-icon>
          </v-btn>
        </template>

        <v-list dense>
          <v-list-item v-for="(item, index) in accounts" :key="index">
            <v-list-item-action>{{item}}</v-list-item-action>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
export default {
  components: {},
  props: {
    source: String
  },

  data() {
    return {
      clickCategory: false,
      accounts: ["Thông tin tài khoản", "Đăng xuất"]
    };
  }
};
</script>

<style lang="scss">
.v-btn__content {
  color: white;
}
.v-toolbar__content .v-btn.v-btn--icon.v-size--default {
  width: auto;
  padding: 10px;
}
</style>