<template>
  <div>
    <Table
      hasAddNew
      :headers="headers"
      :items="shipperList"
      :name="tableName"
      :iconList="iconList"
      :pagination="pagination"
      @backHome="handleClickIcon($event, 'backHome')"
      @delete="clickDeletIcon($event)"
      @changePage="getShipperList($event)"
      @addNew="dialog = true"
    >
      <!-- Show creater -->
      <template v-slot:store_id="{ column }">
        <span v-if="column.item.store_id">a</span>
        <span v-else>Admin</span>
      </template>

      <!-- Show status -->
      <template v-slot:status="{ column }">
        <span v-if="column.item.status">Hoạt động</span>
        <span v-else style="color: red">Bị khóa</span>
      </template>
    </Table>

    <!-- Add shipper -->
    <v-dialog v-model="dialog" persistent max-width="600px">
      <AddShipper v-if="dialog" @create="handleAddShipper" @cancel="handleCancelAddShipper" />
    </v-dialog>

    <!-- Message -->
    <v-snackbar v-model="snackbar" top color="#fff" :timeout="notification.time">
      <v-alert text :type="notification.type">{{ notification.content }}</v-alert>
    </v-snackbar>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Table from "@/components/molecules/Table";
import AddShipper from "@/components/admin/shipper/AddShipper";

export default {
  layout: "admin",
  middleware: "adminAuth",
  components: {
    Table,
    AddShipper
  },

  data() {
    return {
      delDialog: false,
      deleteItem: {},
      dialog: false,
      headers: [
        {
          text: "Mã tài xế",
          align: "left",
          value: "id"
        },
        { text: "Tên tài xế", value: "name" },
        { text: "Địa chỉ", value: "address" },
        { text: "Số điện thoại", value: "phone" },
        { text: "Số CCCD", value: "identification" },
        { text: "Biển kiểm soát", value: "license_plates" },
        { text: "Trạng thái", value: "status" }
      ],
      tableName: "Danh sách tài xế",
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
    ...mapState("shipper", ["shipperList"])
  },
  async asyncData({ store }) {
    await store.dispatch("shipper/getShipperList");
  },

  async created() {
    if (!this.shipperList.length) {
      await this.getShipperList();
    }
  },

  methods: {
    ...mapActions("shipper", ["getShipperList", "createShipper"]),

    async handleAddShipper(value) {
      try {
        const res = await this.createShipper(value);

        if (res.isSuccess) {
          this.notification = {
            ...this.notification,
            content: "Thêm shipper thành công"
          };
          this.snackbar = true;
          this.dialog = false;
        } else {
          this.notification = {
            ...this.notification,
            content: res.message,
            type: "error"
          };
          this.snackbar = true;
        }
      } catch (err) {
        console.log("andleAddShipper", err);
        this.notification = {
          ...this.notification,
          content: "Đã có lỗi xảy ra, vui lòng thử lại",
          type: "error"
        };
      }
    },

    handleCancelAddShipper() {
      this.dialog = false;
      this.delDialog = false;
      this.deleteItem = {};
    },

    clickDeletIcon(value) {
      this.delDialog = true;
      this.deleteItem = value;
    },

    async handleDeleteShipper() {
      try {
        const res = await this.deleteShipper(this.deleteItem);

        if (res.isSuccess) {
          this.notification = {
            ...this.notification,
            content: "Xóa danh mục thành công"
          };
          this.snackbar = true;
          this.delDialog = false;
        } else {
          this.notification = {
            ...this.notification,
            content: res.message,
            type: "error"
          };
          this.snackbar = true;
        }
      } catch (err) {
        console.log("handleDeleteShipper", err);
        this.notification = {
          ...this.notification,
          content: "Đã có lỗi xảy ra, vui lòng thử lại",
          type: "error"
        };
      }
    },

    handleClickIcon(value, text) {
      console.log(text, value);
    }
  }
};
</script>