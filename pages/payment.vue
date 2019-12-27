<template>
  <v-container>
    <v-row>
      <v-col cols="6">
        <v-card>
          <v-card-title class="layout justify-center" color="orange darken-2">
            <span class="headline">Thông tin người nhận</span>
          </v-card-title>

          <v-form ref="form" v-model="valid">
            <v-row no-gutters justify="center">
              <v-col cols="12" md="10">
                <v-text-field
                  v-model="receiver.name_recieve"
                  label="Tên người nhận"
                  :rules="rules.name"
                  outlined
                  required
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row no-gutters justify="center">
              <v-col cols="12" md="10">
                <v-text-field
                  label="Số điện thoại"
                  :rules="rules.phone"
                  outlined
                  v-model="receiver.phone_recieve"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row no-gutters justify="center">
              <v-col cols="12" md="10">
                <v-text-field
                  label="Địa chỉ"
                  :rules="rules.address"
                  outlined
                  v-model="receiver.address"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row no-gutters justify="center">
              <v-col cols="12" md="10">
                <v-textarea label="Ghi chú" outlined v-model="receiver.note"></v-textarea>
              </v-col>
            </v-row>
          </v-form>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card>
          <v-card-title class="layout justify-center" color="orange darken-2">
            <span class="headline">Chi tiết đơn hàng</span>
          </v-card-title>
          <v-divider vertical light></v-divider>
          <v-simple-table dense>
            <tbody v-for="(item,index) in Object.keys(cart)" :key="index">
              <tr>
                <td class="text-left">
                  <span class="order-item-number">{{cart[item].quantity}}</span>
                  <span class="order-item-name">X {{cart[item].name }}</span>
                </td>
                <td
                  class="text-center"
                >{{ Number(cart[item].current_price) * Number(cart[item].quantity)}} VNĐ</td>
              </tr>
            </tbody>
          </v-simple-table>

          <v-card-text>
            <label>Tổng tiền:</label>
            {{ cartTotal }} VND
          </v-card-text>
          <v-card-text v-if="receiver.address">
            <label>Phí giao hàng:</label>
            {{ receiver.ship_price }} VND
          </v-card-text>

          <v-divider></v-divider>
          <v-card-text class="mx-auto color:white">
            <label>
              <b>Tổng cần thanh toán:</b>
            </label>
            {{ cartTotal + receiver.ship_price }} VND
          </v-card-text>
        </v-card>
        <br />
        <v-card>
          <v-card-title class="layout justify-center" color="orange darken-2">
            <span class="headline">Hình thức thanh toán</span>
          </v-card-title>
          <center>
            <p>Thanh toán tiền mặt khi nhận hàng</p>
          </center>
        </v-card>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            width="100%"
            color="orange"
            class="text-right"
            :disabled="!valid"
            @click="handleOrder"
          >
            Đặt hàng
            <v-icon dark right>mdi-arrow-right</v-icon>
          </v-btn>
        </v-card-actions>
      </v-col>
    </v-row>

    <!-- Message -->
    <v-snackbar v-model="snackbar" top color="#fff" :timeout="notification.time">
      <v-alert text :type="notification.type">{{ notification.content }}</v-alert>
    </v-snackbar>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";

export default {
  middleware: ["customAuth", "cartAuth"],
  data() {
    return {
      valid: true,
      cart: {},
      receiver: {
        name_recieve: "",
        phone_recieve: "",
        note: "",
        address: "",
        ship_price: 10000
      },

      rules: {
        name: [v => !!v || "Bạn chưa nhập tên người nhận"],
        phone: [
          v => !!v || "Bạn chưa nhập số điện thoại",
          v => !isNaN(Number(v)) || "Số điện thoại không hợp lệ",
          v =>
            (v.toString().length >= 9 && v.toString().length <= 11) ||
            "Số điện thoại phải từ 9 - 11 số"
        ],
        address: [v => !!v || "Bạn chưa nhập địa chỉ"]
      },

      snackbar: false,
      notification: {
        time: 1000,
        type: "success",
        content: ""
      }
    };
  },

  computed: {
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
      const cart = this.$auth.$storage.getUniversal("cart");
      if (cart !== null) {
        this.cart = cart;
      }

      const user = this.$auth.$storage.getUniversal("user");
      if (user) {
        this.receiver = {
          ...this.receiver,
          name_recieve: user.name ? user.name : "",
          phone_recieve: user.phone ? user.phone : "",
          address: user.address ? user.address : ""
        };
      }
    }
  },

  methods: {
    ...mapActions("order", ["createOrder"]),
    async handleOrder() {
      const store_id = this.$auth.$storage.getUniversal("storeId");
      const dish = Object.keys(this.cart).map(item => this.cart[item]);
      const token = "Bearer " + this.$auth.$storage.getUniversal("token");
      const orderInfo = {
        token,
        dish,
        ...this.receiver,
        store_id
      };

      try {
        const res = await this.createOrder(orderInfo);

        if (res.isSuccess) {
          this.notification = {
            ...this.notification,
            content: "Bạn đã đặt hàng thành công"
          };
          this.$auth.$storage.removeUniversal("cart");
          this.$auth.$storage.removeUniversal("storeId");
          this.snackbar = true;

          const _this = this;
          setTimeout(function() {
            _this.$router.push("/");
          }, this.notification.time);
        } else {
          this.notification = {
            ...this.notification,
            content: res.message,
            type: "error"
          };
          this.snackbar = true;
        }
      } catch (err) {
        console.log("handleOrder", err);
        this.notification = {
          ...this.notification,
          content: "Đã có lỗi xảy ra, vui lòng thử lại",
          type: "error"
        };
      }
    }
  }
};
</script>
<style scoped>
.order-item-number {
  background-color: orange;
  color: aliceblue;
  padding-left: 5px;
  padding-right: 5px;
  border-radius: 4px;
}
.order-item-name {
  font-weight: bolder;
}
</style>