
<template>
  <v-container v-if="foodList.length > 0">
    <div>
      <v-card shaped>
        <v-card-title class="layout justify-center" color="orange darken-2">
          <span class="headline">Giỏ hàng</span>
        </v-card-title>
        <v-divider vertical light></v-divider>
        <v-simple-table dense>
          <thead>
            <th class="text-center">Hình ảnh</th>
            <th class="text-left">Tên món</th>
            <th class="text-center">Số lượng</th>
            <th class="text-center">Giá món</th>
          </thead>
          <tbody v-for="dish in foodList" :key="dish.id">
            <tr>
              <td class="text-center mx-auto">
                <v-img class="mx-auto" max-width="150px" max-height="150px" :src="dish.src"></v-img>
              </td>
              <td class="text-left">{{ dish.name }}</td>

              <td class="text-center">
                <v-card flat class="py-12">
                  <v-card-text>
                    <v-btn-toggle dense>
                      <v-btn min-width="10px" @click="decrementQuantity({id: dish.id})">
                        <span>-</span>
                      </v-btn>
                      <v-btn min-width="10px">
                        <span>{{ dish.quantity }}</span>
                      </v-btn>
                      <v-btn min-width="10px" @click="incrementQuantity({id: dish.id})">
                        <span>+</span>
                      </v-btn>
                    </v-btn-toggle>
                  </v-card-text>
                </v-card>
              </td>
              <td class="text-center">{{ dish.price}}VNĐ</td>

              <td class="text-center">
                <v-btn depressed color="error" @click="removeDish({id: dish.id})">
                  <v-icon left>mdi-delete</v-icon>Delete
                </v-btn>
              </td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-card>
    </div>
    <v-card-actions>
      <v-btn exact to="/PaymentPage" color="deep-orange" dark class="mx-auto">Tiến hành thanh toán</v-btn>
    </v-card-actions>
  </v-container>
  <v-container v-else>
    <v-img
      class="white--text mx-auto"
      max-width="300"
      max-height="300"
      src="https://www.tangerineworld.com/web_theme/images/empty-cart.png"
    ></v-img>
  </v-container>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      dialog: false,

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
  },
  computed: {
    ...mapState("shoppingCart", ["foodList"])
  },
  methods: {
    ...mapMutations("shoppingCart", [
      "removeDish",
      "decrementQuantity",
      "incrementQuantity"
    ])
  }
};
</script>
<style scoped>
.layout {
  color: orange;
}
.v-data-table th {
  font-size: 15px;
}
</style>

