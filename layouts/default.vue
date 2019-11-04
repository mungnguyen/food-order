<template>
  <v-app class="food-order">
    <v-app-bar app clipped-left color="#000">
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
        <v-btn class="text-transform-none" small color="#fff" text>Trang chủ</v-btn>
        <v-divider vertical light></v-divider>
        <v-btn class="text-transform-none" small color="#fff" text>Danh mục</v-btn>
        <v-divider vertical light></v-divider>
        <v-btn class="text-transform-none" small color="#fff" text>Về chúng tôi</v-btn>
        <v-divider vertical light></v-divider>
        <v-btn class="text-transform-none" small color="#fff" text>Đăng kí</v-btn>
        <v-divider vertical light></v-divider>
        <v-btn class="text-transform-none" small color="#fff" text>Đăng nhập</v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <v-content>
      <v-container fluid class="grey lighten-4 fill-height">
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  props: {
    source: String
  }
};
</script>

<style lang="scss">
.food-order {
  color: #fff;
  .v-input__slot {
    width: 100%;
  }

  .v-btn.text-transform-none {
    text-transform: none !important;

    span:hover {
      color: #e49f02;
    }
  }

  .v-divider--vertical {
    align-self: center;
    height: 27%;
    min-height: 0;
    max-height: 100%;
  }

  .theme--light.v-divider {
    border-color: rgb(128, 128, 128, 0.5);
  }
}
</style>