<template>
  <v-menu open-on-hover bottom offset-y>
    <template v-slot:activator="{ on }">
      <v-btn icon to="/ShoppingCart" exact v-on="on">
        <v-badge overlap color="#e49f02">
          <template v-slot:badge>
            <span v-if="foodList.length">{{foodList.length}}</span>
          </template>
          <v-icon color="#fff">mdi-cart</v-icon>
        </v-badge>
      </v-btn>
    </template>
    <v-card v-if="foodList.length > 0" :width="500">
      <v-container>
        <v-card-title class="layout justify-center" color="orange darken-2">
          <span class="headline">Giỏ hàng</span>
        </v-card-title>
        <v-row v-for="dish in foodList" :key="dish.id">
          <v-col cols="2">
            <v-img :src="dish.src" :width="50" :height="50"></v-img>
          </v-col>

          <v-col cols="4">
            <span>{{dish.name}}</span>
            <br />
            <span>X {{dish.quantity}}</span>
          </v-col>
          <v-col cols="3">
            <span>{{dish.price}}</span>
          </v-col>
>
          <v-col cols="3">{{dish.price * dish.quantity}} VND</v-col>
        </v-row>
        <v-card-actions>
          <v-col cols="8">
            <v-btn
              depressed
              color="orange darken-2"
              class="text-center"
              :disabled="!foodList.length"
            >Chi tiết giỏ hàng</v-btn>
          </v-col>
          <v-col cols="6">
            <v-btn
              depressed
              color="orange darken-2"
              class="justify-right"
              :disabled="!foodList.length"
            >Thanh toán</v-btn>
          </v-col>
        </v-card-actions>
      </v-container>
    </v-card>
    <v-card v-else>
      <v-img src="require('@_static/images/emptycart.png')" width="300"></v-img>
    </v-card>
  </v-menu>
</template>
<script>
export default {
  data() {
    return {
      foodList: [
        {
          id: 1,
          src: "/images/NewFood/food-4.jpg",
          name: "Whitehaven Beach",
          price: "120000",
          quantity: "1"
        },
        {
          id: 2,
          src: "/images/NewFood/food-1.jpg",
          name: "Whitehaven Beach",
          price: "120000",
          quantity: "1"
        },
        {
          id: 3,
          src: "/images/NewFood/food-2.jpg",
          name: "Whitehaven Beach",
          price: "120000",
          quantity: "1"
        },
        {
          id: 4,
          src: "/images/NewFood/food-3.jpg",
          name: "Whitehaven Beach",
          price: "120000",
          quantity: "1"
        }
      ]
    };
  }
};
</script>

<style scoped>
.v-menu__content {
  height: 213px;
}
</style>
