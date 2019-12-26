<template>
  <v-container>
    <v-row>
      <v-col cols="5">
        <v-card>
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
              <v-text-field label="Số điện thoại" outlined v-model="phone"></v-text-field>
            </v-col>
          </v-row>

          <v-row no-gutters justify="center">
            <v-col cols="12" md="10">
              <v-text-field label="Địa chỉ" outlined v-model="address"></v-text-field>
            </v-col>
          </v-row>

          <v-row no-gutters justify="center">
            <v-col cols="12" md="10">
              <v-textarea label="Ghi chú" outlined v-model="note"></v-textarea>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="5">
        <v-card>
          <v-card-title class="layout justify-center" color="orange darken-2">
            <span class="headline">Chi tiết đơn hàng</span>
          </v-card-title>
          <v-divider vertical light></v-divider>
          <v-simple-table dense>
            <tbody v-for="(item,index) in foodList" :key="index">
              <tr>
                <td class="text-left">
                  <span class="order-item-number">{{item.quantity}}</span>
                  <span class="order-item-name">X {{ item.name }}</span>
                </td>
                <td class="text-center">{{ item.price*item.quantity}}VNĐ</td>
              </tr>
            </tbody>

            <tfoot>
              <v-card-text>
                <label>Tổng tiền:</label>
              </v-card-text>
              <v-card-text>
                <label>Phí giao hàng:</label>
              </v-card-text>
              <v-card-text class="mx-auto color:white">
                <label>
                  <b>Tổng cần thanh toán:</b>
                </label>
              </v-card-text>
            </tfoot>
          </v-simple-table>
        </v-card>
        <br />
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn rounded color="orange" class="text-right">
            Thanh toán
            <v-icon dark right>mdi-arrow-right</v-icon>
          </v-btn>
        </v-card-actions>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      foodList: [
        {
          id: 1,
          src: "/images/NewFood/food-4.jpg",
          name: "Pizza",
          price: "120000",
          quantity: "1"
        },
        {
          id: 2,
          src: "/images/NewFood/food-1.jpg",
          name: "Whitehaven Beach",
          price: "120000",
          quantity: "2"
        }
      ]
    };
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