<template>
  <div>
    <Table
      hasAddNew
      :headers="headers"
      :items="storeList"
      :name="tableName"
      :iconList="iconList"
      :pagination="pagination"
      @delete="clickDeletIcon($event)"
      @changePage="getStoreList($event)"
      @addNew="dialog = true"
    >
      <!-- Show creater -->
      <template v-slot:store_id="{ column }">
        <span v-if="column.item.store_id">a</span>
        <span v-else>Admin</span>
      </template>

      <!-- Show status -->
      <template v-slot:status="{ column }">
        <span v-if="column.item.status">Đã duyệt</span>
        <span v-else style="color: red">Chưa duyệt</span>
      </template>
    </Table>

    <!-- Add store -->
    <v-dialog v-model="dialog" persistent max-width="600px">
      <AddStore v-if="dialog" @create="handleAddStore" @cancel="handleCancelAddStore" />
    </v-dialog>

    <!-- Delete store -->
    <v-dialog v-model="delDialog" persistent max-width="600px">
      <v-card>
        <v-toolbar color="#e49f02" class="layout justify-center">
          <v-card-title>
            <span class="headline">Xóa danh mục</span>
          </v-card-title>
        </v-toolbar>
        <v-card-text>
          <v-container>
            <p>Bạn có chắc chắn muốn xóa cửa hàng này không?</p>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="handleDeleteStore" color="success" class="mr-4">
            <v-icon dark left>mdi-checkbox-marked-circle-outline</v-icon>Xóa
          </v-btn>
          <v-btn color="error" text @click="handleCancelAddStore">
            <v-icon left>mdi-close-circle-outline</v-icon>Hủy
          </v-btn>
        </v-card-actions>
      </v-card>
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
import AddStore from "@/components/admin/store/AddStore";

export default {
  layout: "admin",
  middleware: "adminAuth",
  components: {
    Table,
    AddStore
  },

  data() {
    return {
      delDialog: false,
      deleteItem: {},
      dialog: false,
      headers: [
        {
          text: "Mã cửa hàng",
          align: "left",
          value: "id"
        },
        { text: "Tên cửa hàng", value: "name" },
        { text: "Địa chỉ", value: "address" },
        { text: "Số điện thoại", value: "phone" },
        { text: "Giờ mở", value: "start_time" },
        { text: "Giờ đóng", value: "close_time" }
      ],

      tableName: "Danh sách cửa hàng",

      iconList: [
        {
          color: "blue",
          icon: "mdi-pencil-box",
          content: "Chỉnh sửa",
          event: "update"
        },
        {
          color: "error",
          icon: "mdi-delete",
          content: "Xóa",
          event: "delete"
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
    ...mapState("store", ["storeList", "pagination"])
  },

  async asyncData({ store }) {
    await store.dispatch("store/getStoreList");
  },

  async created() {
    if (!this.storeList.length) {
      await this.getStoreList();
    }
  },

  methods: {
    ...mapActions("store", ["getStoreList", "createStore", "deleteStore"]),

    async handleAddStore(value) {
      try {
        const res = await this.createStore(value);

        if (res.isSuccess) {
          this.notification = {
            ...this.notification,
            content: "Taọ cửa hàng thành công"
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
        console.log("andleAddStore", err);
        this.notification = {
          ...this.notification,
          content: "Đã có lỗi xảy ra, vui lòng thử lại",
          type: "error"
        };
      }
    },

    handleCancelAddStore() {
      this.dialog = false;
      this.delDialog = false;
      this.deleteItem = {};
    },

    clickDeletIcon(value) {
      this.delDialog = true;
      this.deleteItem = value;
    },

    async handleDeleteStore() {
      try {
        const res = await this.deleteStore(this.deleteItem);

        if (res.isSuccess) {
          this.notification = {
            ...this.notification,
            content: "Xóa cửa hàng thành công"
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
        console.log("handleDeleteStore", err);
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