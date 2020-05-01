<template>
  <div>
    <Table
      hasAddNew
      :headers="headers"
      :items="categoryList"
      :name="tableName"
      :iconList="iconList"
      :pagination="pagination"
      @backHome="handleClickIcon($event, 'backHome')"
      @delete="clickDeletIcon($event)"
      @changePage="getCategoryList($event)"
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

    <!-- Add category -->
    <v-dialog v-model="dialog" persistent max-width="600px">
      <AddCategory v-if="dialog" @create="handleAddCategory" @cancel="handleCancelAddCategory" />
    </v-dialog>

    <!-- Delete category -->
    <v-dialog v-model="delDialog" persistent max-width="600px">
      <v-card>
        <v-toolbar color="#e49f02" class="layout justify-center">
          <v-card-title>
            <span class="headline">Xóa danh mục</span>
          </v-card-title>
        </v-toolbar>
        <v-card-text>
          <v-container>
            <p>Bạn có chắc chắn muốn xóa danh mục này không?</p>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="handleDeleteCategory" color="success" class="mr-4">
            <v-icon dark left>mdi-checkbox-marked-circle-outline</v-icon>Xóa
          </v-btn>
          <v-btn color="error" text @click="handleCancelAddCategory">
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
import AddCategory from "@/components/admin/category/AddCategory";

export default {
  layout: "admin",
  middleware: "adminAuth",
  components: {
    Table,
    AddCategory
  },

  data() {
    return {
      delDialog: false,
      deleteItem: {},
      dialog: false,
      headers: [
        {
          text: "Mã danh mục",
          align: "left",
          value: "id"
        },
        { text: "Tên danh mục", value: "name" },
        { text: "Được tạo bởi", value: "store_id" },
        { text: "Trạng thái", value: "status" }
      ],

      tableName: "Danh sách danh mục",

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
    ...mapState("category", ["categoryList", "pagination"])
  },

  async asyncData({ store }) {
    await store.dispatch("category/getCategoryList");
  },

  async created() {
    if (!this.categoryList.length) {
      await this.getCategoryList();
    }
  },

  methods: {
    ...mapActions("category", [
      "getCategoryList",
      "createCategory",
      "deleteCategory"
    ]),

    async handleAddCategory(value) {
      try {
        const res = await this.createCategory(value);

        if (res.isSuccess) {
          this.notification = {
            ...this.notification,
            content: "Taọ danh mục thành công"
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
        console.log("andleAddCategory", err);
        this.notification = {
          ...this.notification,
          content: "Đã có lỗi xảy ra, vui lòng thử lại",
          type: "error"
        };
      }
    },

    handleCancelAddCategory() {
      this.dialog = false;
      this.delDialog = false;
      this.deleteItem = {};
    },

    clickDeletIcon(value) {
      this.delDialog = true;
      this.deleteItem = value;
    },

    async handleDeleteCategory() {
      try {
        const res = await this.deleteCategory(this.deleteItem);

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
        console.log("handleDeleteCategory", err);
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