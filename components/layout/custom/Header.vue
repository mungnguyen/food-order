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
      <div class="text-transform-none">
        <NuxtLink to="/">
          <v-btn color="#fff" small text>Trang chủ</v-btn>
        </NuxtLink>
      </div>
      <v-divider vertical light></v-divider>

      <div class="text-transform-none">
        <v-menu offset-y nudge-top="-8%" dense>
          <template v-slot:activator="{ on }">
            <v-btn small color="#e49f02" @click="clickCategory = !clickCategory" v-on="on">
              Danh mục
              <v-icon
                size="16"
              >{{ clickCategory ? "mdi-chevron-up-circle" : "mdi-chevron-down-circle" }}</v-icon>
            </v-btn>
          </template>

          <v-list dense>
            <v-row>
              <v-col cols="6" v-for="(item, index) in categoryList" :key="index">
                <v-btn small>{{ item.name }}</v-btn>
              </v-col>
            </v-row>
          </v-list>
        </v-menu>
      </div>
      <v-divider vertical light></v-divider>

      <div class="text-transform-none">
        <v-btn small color="#fff" text>Về chúng tôi</v-btn>
      </div>
      <v-divider vertical light></v-divider>

      <div class="text-transform-none">
        <v-flex>
          <Register />
        </v-flex>
      </div>
      <v-divider vertical light></v-divider>

      <div class="text-transform-none">
        <v-flex>
          <Login />
        </v-flex>
      </div>
      <v-divider vertical light></v-divider>
    </v-toolbar-items>

    <v-badge>
      <Cart />
    </v-badge>
  </v-app-bar>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Login from "@/components/Login";
import Register from "@/components/Register";
import Cart from "@/components/Cart";

export default {
  components: {
    Login,
    Register,
    Cart
  },
  props: {
    source: String
  },

  data() {
    return {
      clickCategory: false
    };
  },

  computed: {
    ...mapState("category", ["categoryList"])
  },

  methods: {
    ...mapActions("category", ["getCategoryList"])
  }
};
</script>

<style lang="scss">
.custom-header {
  a {
    text-decoration: none !important;
  }
}
</style>