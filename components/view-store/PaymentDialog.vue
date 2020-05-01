<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn small color="#fff" text v-on="on">Đặt hàng</v-btn>
      </template>
      <v-card flat>
        <v-toolbar color="#e49f02"></v-toolbar>
          <v-card-title class="layout justify-center">
            <span class="headline">Xác nhận đơn hàng</span>
          </v-card-title>
        </v-toolbar>

        <v-card-text>
            <v-row>
              <v-col cols="7">
                <v-card shaped>
                  <v-card-title class="layout justify-center" color="orange darken-2">
                    <span class="headline">Đơn hàng của bạn</span>
                  </v-card-title>
                  <v-divider vertical light></v-divider>
                  <v-simple-table dense>
                    <tbody v-for="(dish,index) in foodList" :key="index">
                      <tr>
                        <td class="text-center">
                          <span class="order-item-number">{{dish.quantity}}</span>
                          <span class="order-item-name">{{ dish.name }}</span>
                        </td>
                        <td class="text-center">{{ dish.price*dish.quantity}}VNĐ</td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <v-card-text>
                        <label>Tổng tiền:</label>
                      </v-card-text>
                      <v-card-text>
                        <label>Phí vận chuyển:</label>
                      </v-card-text>
                      <v-card-text class="mx-auto color:white">
                        <label>
                          <b>Tổng cần thanh toán:</b>
                        </label>
                      </v-card-text>
                    </tfoot>
                  </v-simple-table>
                </v-card>
              </v-col>
              <v-col cols="5">
                <v-card shaped>
                  <v-card-title class="layout justify-center" color="orange darken-2">
                    <span class="headline">Thông tin người nhận</span>
                  </v-card-title>

                  <v-row no-gutters justify="center">
                    <v-col cols="12" md="10">
                      <v-text-field v-model="name" label="Tên người nhận" outlined required></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row no-gutters justify="center">
                    <v-col cols="12" md="10">
                      <v-text-field label="Địa chỉ" outlined v-model="address"></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row no-gutters justify="center">
                    <v-col cols="12" md="10">
                      <v-text-field label="Số điện thoại" outlined v-model="phone"></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row no-gutters justify="center">
                    <v-col cols="12" md="10">
                      <v-textarea label="Ghi chú" outlined v-model="note"></v-textarea>
                    </v-col>
                  </v-row>
                </v-card>
                <br />
                <v-card-actions>
                  <v-btn color="orange darken-2" dark text @click="dialog = false">
                    <v-icon dark left>mdi-arrow-right</v-icon>Đặt hàng
                  </v-btn>
                </v-card-actions>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      valid: true,
      dialog: false,
      displayPassword: false,

      email: "",
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
      password: "",
      pwRules: [
        v => !!v || "Password is required",
        v => v.length >= 8 || "Min 8 characters",
        v => /[A-Z]+/.test(v) || "One uppercase letter required"
      ]
    };
  },
  computed: {
    ...mapState
  }
};
</script>
