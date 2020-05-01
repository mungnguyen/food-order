<template>
  <v-app-bar app clipped-left color="blue" class="custom-header">
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
            <span>STORE</span>
            <v-icon color="white">mdi-account-circle</v-icon>
          </v-btn>
        </template>

        <v-list dense>
          <v-list-item v-for="(item, index) in accounts" :key="index">
            <span>
              <v-icon class="icon">{{item.icon}}</v-icon>
            </span>
            <v-list-item-action>{{item.name}}</v-list-item-action>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
export default {
  data() {
    return {
      clickCategory: false,
      accounts: [
        {
          name: "Thông tin tài khoản",
          icon: "mdi-account-edit"
        },
        {
          name: "Đăng xuất",
          icon: "mdi-power"
        }
      ]
    };
  }
};
</script>

<style scoped>
.v-btn__content {
  color: white;
}
.v-toolbar__content .v-btn.v-btn--icon.v-size--default {
  width: auto;
  padding: 10px;
}
.icon {
  background: orange;
}
.food-order
  .v-menu__content.theme--light.v-menu__content--fixed.menuable__content__active
  .v-list-item {
  padding-right: 10px;
}
</style>