<template>
  <v-app class="food-order">
    <Header />

    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>

    <Footer />
  </v-app>
</template>

<script>
import Header from "@/components/layout/custom/Header";
import Footer from "@/components/layout/custom/Footer";
export default {
  components: {
    Header,
    Footer
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