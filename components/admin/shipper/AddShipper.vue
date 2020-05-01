<template>
  <v-row justify="center">
    <v-card>
      <v-toolbar color="#e49f02" class="layout justify-center">
        <v-card-title>
          <span class="headline">Thêm tài xế</span>
        </v-card-title>
      </v-toolbar>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="6" md="6">
              <v-text-field v-model="name" :rules="nameRules" label="Tên tài xế " required></v-text-field>
            </v-col>

            <v-col cols="6" md="6">
              <v-text-field v-model="email" :rules="emailRules" label="Email" required></v-text-field>
            </v-col>

            <v-col cols="6" md="6">
              <v-text-field v-model="phone" :rules="phoneRules" label="Số điện thoại" required></v-text-field>
            </v-col>

            <v-col cols="6" md="6">
              <v-text-field v-model="address" :rules="addressRules" label="Địa chỉ" required></v-text-field>
            </v-col>

            <v-col cols="6" md="6">
              <v-text-field
                v-model="identification"
                :rules="identificationRules"
                label="Căn cước công dân"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="6" md="6">
              <v-text-field
                v-model="license_plates"
                :rules="licenseplatesRules"
                label="Biển số xe"
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
      dialog: false,
      name: "",
      nameRules: [v => !!v || "Bạn chưa nhập tên tài xế"],
      email: "",
      emailRules: [
        v => !!v || "Bạn chưa nhập email",
        v => /.+@.+\..+/.test(v) || "Email không hợp lệ"
      ],
      phone: "",
      phoneRules: [v => !!v || "Bạn chưa nhập số điện thoại"],
      address: "",
      addressRules: [v => !!v || "Bạn chưa nhập địa chỉ"],
      identification: "",
      identificationRules: [
        v => !!v || "Bạn chưa nhập số số căn cước công dân"
      ],
      license_plates: "",
      licenseplatesRules: [v => !!v || "Bạn chưa nhập biển kiểm soát"]
    };
  },

  methods: {
    clickAddNew() {
      const shipper = {
        name: this.name,
        email: this.email,
        phone: this.phone,
        address: this.address,
        identification: this.identification,
        license_plates: this.license_plates
      };
      this.$emit("create", shipper);
    },

    clickCancel() {
      this.$emit("cancel");
    }
  }
};
</script>
<style>
/* .row {
  display: contents;
} */
</style>
