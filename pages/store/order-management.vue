<template>
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
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Table from "@/components/molecules/Table";

export default {
  layout: "store",
  middleware: "storeAuth",
  components: {
    Table
  },

  data() {
    return {
      headers: [
        {
          text: "Mã đơn hàng",
          align: "left",
          value: "id"
        },
        { text: "Người nhận", value: "name_recieve" },
        { text: "Số điện thoại", value: "phone_recieve" },
        { text: "Thời gian đặt", value: "time" }
      ],

      tableName: "Danh sách đơn hàng",

      iconList: [
        {
          color: "blue",
          icon: "mdi-pencil-box",
          content: "Chỉnh sửa",
          event: "backHome"
        },
        {
          color: "error",
          icon: "mdi-delete",
          content: "Xóa",
          event: "showCart"
        }
      ]
    };
  },
  computed: {
    ...mapState("order", ["orderList", "pagination"])
  },

  async asyncData({ store }) {
    await store.dispatch("order/getOrderList");
  },

  async created() {
    if (!this.orderList.length) {
      await this.getOrderList();
    }
  },

  methods: {
    ...mapActions("order", ["getOrderList"]),

    handleClick() {
      console.log("Icon is clicked");
    },

    handleClickIcon(value, text) {
      console.log(text, value);
    }
  }
};
</script>