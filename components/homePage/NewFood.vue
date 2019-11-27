<template>
  <div class="new-food">
    <h2>
      <center>
        <v-icon>mdi-food</v-icon>&nbsp;Món ngon hôm nay
      </center>
    </h2>
    <v-divider></v-divider>
    <v-row>
      <v-col cols="3" md="3" v-for="(item, index) in foodList" :key="index">
        <v-hover v-slot:default="{ hover }" :value="false">
          <v-card shaped :elevation="hover ? 12 : 2" width="90%">
            <div class="food-images">
              <center>
                <v-avatar size="180" :elevation="hover ? 12 : 2">
                  <v-img :src="item.src"></v-img>
                </v-avatar>
              </center>
              <div class="food-menu">
                <div v-for="(el, inx) in icons" :key="inx">
                  <v-tooltip left>
                    <template v-slot:activator="{ on }">
                      <v-btn
                        :class="{ 'show-btn': hover }"
                        fab
                        :icon="!hover"
                        x-small
                        color="transparent"
                        v-on="on"
                      >
                        <v-icon
                          dark
                          :class="{ 'show-icon': hover }"
                          color="transparent"
                        >{{ el.icon }}</v-icon>
                      </v-btn>
                    </template>
                    <span>{{ el.content }}</span>
                  </v-tooltip>
                </div>
              </div>
            </div>
            <v-card-text>
              <center>
                <v-rating
                  v-model="rating"
                  background-color="orange lighten-3"
                  color="orange"
                  size="20px"
                ></v-rating>
                <p :class="{'food-name': hover}">{{ item.name }}</p>
                <p :class="{'food-price': hover}">{{ item.price}} VND</p>
              </center>
            </v-card-text>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      icons: [
        {
          icon: "mdi-heart-outline",
          content: "Yêu thích"
        },

        {
          icon: "mdi-eye",
          content: "Xem chi tiết"
        },
        {
          icon: "mdi-cart-arrow-down",
          content: "Thêm vào giỏ hàng"
        }
      ],

      foodList: [
        {
          src: "/images/NewFood/food-4.jpg",
          name: "Whitehaven Beach",
          price: "120.000"
        },
        {
          src: "/images/NewFood/food-1.jpg",
          name: "Whitehaven Beach",
          price: "120.000"
        },
        {
          src: "/images/NewFood/food-2.jpg",
          name: "Whitehaven Beach",
          price: "120.000"
        },
        {
          src: "/images/NewFood/food-3.jpg",
          name: "Whitehaven Beach",
          price: "120.000"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.new-food {
  margin-top: 5em;

  h2 {
    margin-bottom: 1em;
  }

  .food-images {
    padding-top: 5%;

    .food-menu {
      position: absolute;
      top: 1em;
      right: 0.5em;

      .v-btn {
        margin: 1em 0;
      }
    }
  }

  .show-btn {
    background-color: rgb(228, 159, 2) !important;
    .show-icon {
      color: #fff !important;
    }
  }

  .show-btn:hover {
    background-color: #000 !important;
  }

  .food-name {
    color: rgb(228, 159, 2) !important;
  }

  .food-price {
    color: #000 !important;
  }

  .v-card__text {
    p {
      margin-bottom: 0;
    }
  }
}
</style>