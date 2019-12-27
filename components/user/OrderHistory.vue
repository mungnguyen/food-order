
<template>
  <v-container>
    <div>
      <Table
        :headers="headers"
        :items="orderList"
        :name="tableName"
        :iconList="iconList"
        :pagination="pagination"
        @changePage="getOrderList($event)"
        @backHome="handleClickIcon($event, 'backHome')"
        @showCart="handleClickIcon($event, 'showCart')"
      />
      <!-- <v-card>
        <v-card-title class="layout justify-center" color="orange darken-2">
          <span class="headline">Lịch sử đơn hàng</span>
        </v-card-title>

        <div>
          <v-row>
            <v-col cols="2">
              <v-subheader>Trạng thái</v-subheader>
            </v-col>
            <v-col cols="3" md="3">
              <v-select v-model="status" outlined :items="['Tất cả','Hoàn tất','Đã hủy']"></v-select>
            </v-col>
          </v-row>
          <v-data-table :headers="headers" :items="filterOrders" hide-actions>
            <template slot="items" scope="{ item }">
              <td>{{item.order_id}}</td>
              <td>{{item.time_order}}</td>
              <td>{{item.address_order}}</td>
              <td>{{item.total_price}}</td>
              <td>{{item.status_order}}</td>
            </template>
          </v-data-table>
        </div>
      </v-card>-->
    </div>
  </v-container>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import Table from "@/components/molecules/Table";
export default {
  components: {
    Table
  },
  data() {
    return {
      tableName: "Danh sách đơn hàng",

      iconList: [],
      dialog: false,
      status: "Tất cả",
      orders: [
        {
          order_id: "1",
          time_order: "2019-02-01T18:00:11.000Z",
          name_store: "Món ăn Việt",
          address_store: "Đại La, Đồng Tâm, Hà Nội",
          total_price: "20000",
          status_order: "Hoàn tất"
        },
        {
          order_id: "2",
          time_order: "2019-02-01T18:00:11.000Z",
          name_store: "Món ăn Việt",
          address_store: "Đại La, Đồng Tâm, Hà Nội",
          total_price: "20000",
          status_order: "Đã hủy"
        }
      ],
      headers: [
        {
          text: "Mã đơn hàng",
          align: "left",
          value: "id"
        },
        { text: "Người nhận", value: "name_recieve" },
        { text: "Số điện thoại", value: "phone_recieve" },
        { text: "Thời gian đặt", value: "time" }
      ]
    };
  },

  computed: {
    ...mapState("order", ["orderList"]),
    filterOrders() {
      return this.orders.filter(i => {
        if (this.status === "Tất cả") return i;
        //  if(i.status_order === 1){
        //    i.status_order = 'Hoàn tất';
        //  }else {i.status_order = 'Đã hủy';}
        return !this.status || i.status_order === this.status;
      });
    }
  }
};
</script>
<style scoped>
.v-subheader {
  font-size: 18px;
  font-weight: bolder;
}
</style>

