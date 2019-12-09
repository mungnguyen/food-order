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
        <div class="text-transform-none">
          <v-btn color="#fff" small text>Trang chủ</v-btn>
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
              <v-list-item v-for="(item, index) in items" :key="index" >
                <v-menu open-on-hover offset-x>
                  <template v-slot:activator="{ on }">
                    <div v-on="on">{{ item.title }}</div>
                  </template>

                  <v-list dense>
                    <v-list-item v-for="(el, index) in items" :key="index" >
                      <div text>{{ el.title }}</div>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-list-item>
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

    <v-content>
      <v-container fluid class="grey lighten-4 fill-height">
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Login from '../components/Login'
import Register from '../components/Register'
import Cart from '../components/Cart'
export default {
  props: {
    source: String
  },

  data() {
    return {
      clickCategory: false,
      items: [
        { title: "Click Me 1" },
        { title: "Click Me 2" },
        { title: "Click Me 3" },
        { title: "Click Me 4" }
      ]
    };
  },
  components: {
    Login,
    Register,
    Cart

  }
};
</script>

<style lang="scss">
.food-order {
  color: #fff;
  .v-input__slot {
    width: 100%;
  }

  .text-transform-none {
    .v-btn {
      text-transform: none !important;
    }

    padding: 3.5% 0.5%;
  }

  .text-transform-none:nth-of-type(2) {
    .v-btn {
      border-radius: 1em;
      span {
        color: #fff;
      }
    }
  }

  .text-transform-none:not(:nth-of-type(2)) {
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

  .v-menu__content.theme--light.v-menu__content--fixed.menuable__content__active {
    .v-list-item {
      padding-right: 0;
      div {
        width: 100%;
        font-size: smaller;
      }

      div:hover {
        color: #e49f02;
      }
    }
  }
}
</style>