<template>
  <v-row ref="categoryDish" class="show-category">
    <!-- Category -->
    <v-col cols="2" md="2" class="store-category" style="position: relative">
      <v-overlay :value="overlay" absolute>
        <v-progress-circular indeterminate color="light-blue" size="32" dense></v-progress-circular>
      </v-overlay>
      <v-card flat>
        <v-card-title class="layout justify-center">
          <span class="headline">Thực đơn</span>
        </v-card-title>
        <v-spacer></v-spacer>
        <v-list>
          <v-list-item-group dense v-model="item" color="primary">
            <v-list-item v-for="(item, i) in storeCategoryList" :key="i">
              <v-icon>mdi-puzzle-outline</v-icon>
              <span style="margin-left: 5px">{{item.name}}</span>
            </v-list-item>
          </v-list-item-group>
        </v-list>

        <v-card-actions>
          <div class="action-button">
            <v-btn
              text
              icon
              small
              :disabled="disableState.left"
              @click="handleChangeCategory(true)"
            >
              <v-icon>mdi-chevron-double-left</v-icon>
            </v-btn>
            <v-btn
              text
              icon
              small
              :disabled="disableState.right"
              @click="handleChangeCategory(false)"
            >
              <v-icon>mdi-chevron-double-right</v-icon>
            </v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-col>

    <!-- Dish, by category -->
    <v-col cols="6" md="6" style="position: relative">
      <v-overlay :value="overlay" absolute>
        <v-progress-circular indeterminate color="light-blue" size="32" dense></v-progress-circular>
      </v-overlay>
      <v-card v-for="(item, index) in storeCategoryList" :key="index">
        <v-simple-table>
          <thead>
            <th class="text-left">{{item.name}}</th>
          </thead>
          <v-divider vertical light></v-divider>
          <tbody v-for="(el,index) in item.dishes" :key="index">
            <tr>
              <td class="text-center mx-auto">
                <v-img class="mx-auto" max-width="100px" max-height="100px" :src="el.url_image"></v-img>
              </td>
              <td class="text-left">{{ el.name }}</td>
              <td class="text-center">{{ el.price}}VNĐ</td>
              <td class="text-center">
                <v-btn depressed color="error" min-width="5px" @click="addToCart(el)">
                  <span>+</span>
                </v-btn>
              </td>
            </tr>
            <v-divider vertical light></v-divider>
          </tbody>
        </v-simple-table>
      </v-card>
    </v-col>

    <!-- Order -->
    <v-col cols="4" class="bill-order">
      <v-card v-if flat>
        <v-card-title class="layout justify-center">
          <span class="headline">Đơn hàng của bạn</span>
        </v-card-title>
        <v-card-text>
          <div v-if="showCart" style="width: 100%">
            <div v-for="(item, index) in Object.keys(cart)" :key="index" style="width: 100%">
              <v-row>
                <v-col cols="7">{{ cart[item].name }}</v-col>
                <v-col cols="3">
                  <v-btn-toggle>
                    <v-btn x-small icon @click="subFromCart(cart[item])">
                      <span>-</span>
                    </v-btn>
                    <v-btn x-small icon>
                      <span>{{ cart[item].quantity }}</span>
                    </v-btn>
                    <v-btn x-small icon @click="addToCart(cart[item])">
                      <span>+</span>
                    </v-btn>
                  </v-btn-toggle>
                </v-col>
                <v-col cols="2">
                  <v-icon
                    color="gray"
                    style="cursor: pointer"
                    @click="deleteCartItem(cart[item])"
                  >mdi-trash-can</v-icon>
                </v-col>
              </v-row>
              <div>
                <p style="text-align: right">
                  <i>{{ cart[item].current_price}} VND</i>
                </p>
              </div>
              <v-divider></v-divider>
            </div>
            <div style="display: flex; postion: relative ">
              <p style="text-align: left">Tổng</p>
              <p style="text-align: right; position: absolute; right: 1em">{{cartTotal}} VND</p>
            </div>
          </div>
          <div v-else>
            <center>Bạn chưa chọn sản phẩm nào</center>
          </div>
        </v-card-text>
      </v-card>

      <v-btn width="100%" color="#e49f02" :disabled="!showCart" @click="$emit('order')">Đặt hàng</v-btn>
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      item: 0,
      overlay: false,
      cart: {}
    };
  },

  computed: {
    ...mapState("category", ["storeCategoryList", "storeCatPagi"]),

    disableState() {
      const left = Number(this.storeCatPagi.page) === 0;
      const right =
        Number(this.storeCatPagi.total) <=
        (Number(this.storeCatPagi.page) + 1) *
          Number(this.storeCatPagi.pageSize);
      return {
        left,
        right
      };
    },

    showCart() {
      if (Number(Object.keys(this.cart).length) > 0) return true;
      return false;
    },

    cartTotal() {
      let total = 0;
      const cartKeys = Object.keys(this.cart);
      if (cartKeys.length) {
        for (let i = 0; i < cartKeys.length; i++) {
          const item = cartKeys[i];
          const itemTotalPrice =
            Number(this.cart[item].current_price) *
            Number(this.cart[item].quantity);
          total += itemTotalPrice;
        }
      }

      return total;
    }
  },

  created() {
    if (process.browser) {
      const _cart = localStorage.getItem("cart");
      if (_cart !== null) {
        const cart = JSON.parse(_cart);
        this.cart = Object.assign({}, cart);
      }
    }
  },

  methods: {
    ...mapActions("category", ["getStoreCategoryList"]),

    async handleChangeCategory(isGoLeft) {
      const page = isGoLeft
        ? Number(this.storeCatPagi.page) - 1
        : Number(this.storeCatPagi.page) + 1;
      const pageSize = Number(this.storeCatPagi.pageSize);
      const storeId = this.$route.params.id;

      this.overlay = true;
      try {
        await this.getStoreCategoryList({ storeId, pageSize, page });
        this.overlay = false;
      } catch (err) {
        console.log("handleChangeCategory", err);
      }
    },

    addToCart(item) {
      let _cart = localStorage.getItem("cart");
      const cart = JSON.parse(_cart);
      if (!cart[item.id]) {
        const price =
          parseFloat(item.price) * (1 - parseFloat(Number(item.sale) / 100));
        const dish = {
          ...item,
          dish_id: item.id,
          quantity: 1,
          current_price: price
        };
        cart[item.id] = dish;
      } else {
        cart[item.id].quantity += 1;
      }
      console.log("cart", cart);
      this.cart = Object.assign({}, cart);
      _cart = JSON.stringify(cart);
      localStorage.setItem("cart", _cart);
    },

    subFromCart(item) {
      let _cart = localStorage.getItem("cart");
      const cart = JSON.parse(_cart);
      if (!cart[item.id]);
      else if (cart[item.id].quantity === 1) {
        delete cart[item.id];
      } else {
        cart[item.id].quantity -= 1;
      }
      this.cart = Object.assign({}, cart);
      _cart = JSON.stringify(cart);
      localStorage.setItem("cart", _cart);
    },

    deleteCartItem(item) {
      let _cart = localStorage.getItem("cart");
      const cart = JSON.parse(_cart);
      delete cart[item.id];
      this.cart = Object.assign({}, cart);
      _cart = JSON.stringify(cart);
      localStorage.setItem("cart", _cart);
    }
  }
};
</script>

<style lang="scss" scope>
.show-category {
  .store-category {
    .v-card {
      .v-list {
        padding: 0;
      }

      .v-card__actions {
        padding: 0;
        .action-button {
          margin: auto;
          display: inline;
          .v-btn {
            margin: 0;
            padding: 0;
          }
        }
      }
    }
  }
}
</style>