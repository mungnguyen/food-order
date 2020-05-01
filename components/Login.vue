<template>
  <v-card flat>
    <v-toolbar color="#e49f02">
      <v-card-title class="layout justify-center">
        <span class="headline">Đăng nhập</span>
      </v-card-title>
    </v-toolbar>

    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="email"
              :rules="emailRules"
              prepend-icon="mdi-email"
              label="Email*"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-text-field
              :type=" displayPassword ? 'text' : 'password' "
              v-model="password"
              :rules="pwRules"
              prepend-icon="mdi-lock"
              :append-icon="displayPassword ? 'mdi-eye' : 'mdi-eye-off'"
              label="Mật khẩu"
              @click:append="displayPassword = !displayPassword"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row align="center" justify="center">
          <v-col cols="6" class="text-md-end">
            <p style="color: blue; cursor: pointer" @click="ForgetPasswordPage">Quên mật khẩu?</p>
          </v-col>
          <v-col cols="6" class="text-md-end">
            <p
              style="color: blue; cursor: pointer; text-align: right"
              @click="$emit('register')"
            >Bạn chưa có tài khoản? Đăng kí</p>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="orange darken-2" dark text @click="$emit('back')">
        <v-icon dark left>mdi-arrow-left</v-icon>Trở lại
      </v-btn>
      <v-btn
        @click="handleLogin"
        :disabled="(email.length == 0)||(password.length == 0)"
        color="success"
        class="mr-4"
      >Đăng nhập</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      valid: true,
      displayPassword: false,

      email: "",
      emailRules: [
        v => !!v || "Bạn chưa nhập email",
        v => /.+@.+\..+/.test(v) || "Email không hợp lệ"
      ],
      password: "",
      pwRules: [v => !!v || "Bạn chưa nhập password"]
    };
  },
  computed: {},

  methods: {
    ForgetPasswordPage() {},

    handleLogin() {
      const user = { email: this.email, password: this.password };
      this.$emit("login", user);
    }
  }
};
</script>
