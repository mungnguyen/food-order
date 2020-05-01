<template>
  <v-container>
    <!-- Store information -->
    <StoreInfo />

    <!-- Store category and dishes -->
    <CategoryDish @order="handleOrder" />

    <!-- Exit dialog -->
    <v-dialog v-model="showDialog" width="500">
      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >Bạn đang chuẩn bị rời khỏi trang này</v-card-title>

        <v-card-text>
          <br />
          <p>Nếu bạn rời khỏi trang, thông tin về đơn hàng sẽ bị xóa.</p>
          <p>Bạn có muốn tiếp tục?</p>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="clickExit">Rời trang</v-btn>
          <v-btn text @click="clickCancel">Hủy</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Login dialog -->
    <v-dialog v-model="login" persistent max-width="600px">
      <Login @back="login = false" @login="handleLogin" />
    </v-dialog>

    <!-- Error message -->
    <v-snackbar v-model="snackbar" top color="#fff" :timeout="timeout">
      <v-alert text type="error">Email hoặc mật khẩu không chính xác</v-alert>
    </v-snackbar>
  </v-container>
</template>
<script>
import { mapState, mapActions } from "vuex";
import StoreInfo from "@/components/view-store/StoreInfo";
import CategoryDish from "@/components/view-store/CategoryDish";
import Login from "../../components/Login";

export default {
  layout(ctx) {
    const user = ctx.$auth.$storage.getUniversal("user")
     if(!user) return "default";
    else if (user.role === "custom") return "user"
    return "default"
  },
  components: {
    StoreInfo,
    CategoryDish,
    Login
  },

  data() {
    return {
      to: null,
      showDialog: false,
      login: false,
      timout: 1000,
      snackbar: false
    };
  },

  beforeRouteLeave(to, from, next) {
    console.log("leave");
    if (this.to) {
      next();
    } else {
      this.to = to;
      this.showDialog = true;
    }
  },

  computed: {
    ...mapState("store", ["viewStore"]),
    ...mapState("category", ["storeCategoryList"])
  },

  async asyncData({ store, params }) {
    console.log(params.id);
    try {
      await Promise.all([
        store.dispatch("store/getViewStore", params.id),
        store.dispatch("category/getStoreCategoryList", {
          storeId: params.id,
          pageSize: 6
        })
      ]);
    } catch (err) {
      console.log("storeId-asyncData", err);
    }
  },

  async created() {
    const id = this.$route.params.id;

    if (!Object.keys(this.viewStore).lenth || !this.storeCategoryList) {
      try {
        await Promise.all([
          this.getViewStore(id),
          this.getStoreCategoryList({ storeId: id, pageSize: 6 })
        ]);
      } catch (err) {
        console.log("storeId-created", err);
      }
    }

    const breadList = [
      {
        id: 1,
        name: "Trang chủ",
        url: "/"
      },
      {
        id: 2,
        name: this.viewStore.name,
        url: `/view-store/${id}`
      }
    ];
    this.setBreadList(breadList);
  },

  mounted() {
    const cart = this.$auth.$storage.getUniversal("cart");
    if (cart === null) {
      this.$auth.$storage.setUniversal("cart", {}, true);
    }
  },

  methods: {
    ...mapActions("breadcumbs", ["setBreadList"]),
    ...mapActions("store", ["getViewStore"]),
    ...mapActions("category", ["getStoreCategoryList"]),
    ...mapActions("custom", ["customLogin"]),

    clickExit() {
      this.$auth.$storage.removeUniversal("cart");
      this.$router.push(this.to);
    },

    clickCancel() {
      this.to = null;
      this.showDialog = false;
    },

    handleOrder() {
      const user = this.$auth.$storage.getUniversal("user");
      if (!user || user.role !== "custom") {
        this.login = true;
      } else {
        const id = this.$route.params.id;
        this.$auth.$storage.setUniversal("storeId", id);
        this.to = "/payment";
        this.$router.push(this.to);
      }
    },

    async handleLogin(user) {
      try {
        const { isSuccess } = await this.customLogin(user);

        if (isSuccess) {
          const id = this.$route.params.id;
          this.$auth.$storage.setUniversal("storeId", id);
          this.to = "/payment";
          this.$router.push(this.to);
        } else {
          this.snackbar = true;
        }
      } catch (err) {
        console.log("handleLogin", err);
      }
    }
  }
};
</script>
<style scoped>
.v-card__title {
  color: chocolate;
}
.v-card__actions {
  margin: 10px;
}
.name-store {
  color: #464646;
  font-size: 22px;
  margin-bottom: 4px;
  font-weight: bolder;
}
.address-store {
  font-family: Arial, Helvetica, sans-serif;
  color: orangered;
  font-size: 13px;
  margin-bottom: 2px;
  font-weight: 300;
}
.v-card__title {
  color: "orange darken-2";
}
</style>