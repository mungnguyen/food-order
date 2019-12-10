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
        <h2 class="layout justify-center" color="orange darken-2">Shopping Cart</h2>
      <v-row v-for="(item, index) in foodList" :key="index">
        
          <v-col cols="2">
            <v-img :src="item.src" :width="50" :height="50"></v-img>
          </v-col>
             
          <v-col cols="2"> {{item.name}} </v-col>
           <v-col cols="2">{{item.price}} </v-col>
           <v-col cols="3">
             <!-- {{item.quantity}} -->
             <v-btn-toggle dense>
                <v-btn min-width="0.5rem">
                  <span>-</span>
                </v-btn>
                <v-btn min-width="0.5rem" >
                  <span>{{ item.quantity }}</span>
                </v-btn>
                <v-btn
                 min-width="0.5rem">
                  <span>+</span>
                </v-btn>
              </v-btn-toggle>
            </v-col>
          

          <v-col cols="3">{{item.price * item.quantity}} VND </v-col>

        </v-row>
        <v-card-actions>
          <v-col cols="3"></v-col>
          <v-col cols="8">
          <v-btn
            color="orange darken-2"
            class=" justify-center"
            :disabled="!foodList.length"
            
          >Xem giỏ hàng và thanh toán</v-btn>
          </v-col>
         
        </v-card-actions>
      </v-container>
    </v-card>
    <v-card v-else>
      <v-img
      src="require('@_static/images/emptycart.png')"
      width="300"
      ></v-img>
    </v-card>
</v-menu>
</template>
<script>
  export default {
    data () {
      return{
      foodList: [
        {
          src: "/images/NewFood/food-4.jpg",
          name: "Whitehaven Beach",
          price: "120000",
          quantity: "1"
        },
        {
          src: "/images/NewFood/food-1.jpg",
          name: "Whitehaven Beach",
          price: "120000",
          quantity: "1"
        },
        {
          src: "/images/NewFood/food-2.jpg",
          name: "Whitehaven Beach",
          price: "120000",
          quantity: "1"

        },
        {
          src: "/images/NewFood/food-3.jpg",
          name: "Whitehaven Beach",
          price: "120000",
          quantity: "1"
        }
      ]
    }
    }
  }
</script>

<style scoped>
.v-menu__content {
  height: 213px
}


</style>
