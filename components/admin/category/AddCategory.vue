<template>
  <v-row justify="center">
    <v-card>
      <v-toolbar color="#e49f02" class="layout justify-center">
        <v-card-title>
          <span class="headline">Thêm danh mục</span>
        </v-card-title>
      </v-toolbar>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="name"
                :rules="nameRules"
                prepend-icon="mdi-rename-box"
                label="Tên danh mục"
                required
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="clickAddNew" :disabled="name.length == 0" color="success" class="mr-4">
          <v-icon dark left>mdi-checkbox-marked-circle-outline</v-icon>Thêm
        </v-btn>
        <v-btn color="error" text @click="clickCancel">
          <v-icon left>mdi-close-circle-outline</v-icon>Hủy
        </v-btn>
      </v-card-actions>
    </v-card>
    <!-- </v-dialog> -->
  </v-row>
</template>
<script>
export default {
  data() {
    return {
      name: "",
      nameRules: [v => !!v || "Bạn chưa nhập tên danh mục"]
    };
  },

  methods: {
    clickAddNew() {
      this.$emit("create", this.name);
    },

    clickCancel() {
      this.$emit("cancel");
    }
  }
};
</script>
<style>
.row {
  display: contents;
}
</style>
