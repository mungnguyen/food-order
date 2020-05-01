<template>
  <div>
    <Table
      :headers="headers"
      :items="customList"
      :name="tableName"
      :iconList="iconList"
      :pagination="pagination"
      @backHome="handleClickIcon($event, 'backHome')"
      @showCart="handleClickIcon($event, 'showCart')"
    >
      <!-- Show status -->
      <template v-slot:status="{ column }">
        <span v-if="column.item.status">Hoạt động</span>
        <span v-else style="color: red">Đã khóa</span>
      </template>
    </Table>

    <!-- Message -->
    <v-snackbar v-model="snackbar" top color="#fff" :timeout="notification.time">
      <v-alert text :type="notification.type">{{ notification.content }}</v-alert>
    </v-snackbar>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Table from "@/components/molecules/Table";

export default {
  layout: "admin",
  middleware: "adminAuth",
  components: {
    Table
  },

  data() {
    return {
      headers: [
        {
          text: "Mã người dùng",
          align: "left",
          value: "id"
        },
        { text: "Tên người dùng", value: "name" },
        { text: "Email", value: "email" },
        { text: "Số điện thoại", value: "phone" },

        { text: "Trạng thái", value: "status" }
      ],

      tableName: "Danh sách người dùng",

      iconList: [
        {
          color: "error",
          icon: "mdi-lock",
          content: "Khóa tài khoản",
          event: "showCart"
        }
      ],

      snackbar: false,
      notification: {
        time: 1000,
        type: "success",
        content: ""
      }
    };
  },
  computed: {
    ...mapState("custom", ["customList", "pagination"])
  },

  async asyncData({ store }) {
    await store.dispatch("custom/getCustomList");
  },

  async created() {
    if (!this.customList.length) {
      await this.getCustomList();
    }
  },

  methods: {
    ...mapActions("custom", ["getCustomList"])
  }
};
</script>