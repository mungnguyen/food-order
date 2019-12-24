<template>
  <div class="home">
    <Slider />
    <br />
    <NewStore @showStore="handleChooseStore" />
    <StoreList @showStore="handleChooseStore" />

    <div>
      <p>Store List</p>
      <p
        v-for="(item, index) in list"
        :key="index"
        @click="handleChooseStore(item)"
        style="cursor: pointer"
      >{{item.name}}</p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Slider from "@/components/homePage/Slider";
import NewStore from "@/components/homePage/NewStore";
import StoreList from "@/components/homePage/StoreList";

export default {
  components: {
    Slider,
    NewStore,
    StoreList
  },

  data() {
    return {
      list: [
        {
          id: 1,
          name: "Món ăn Việt - 80 Đại La"
        },
        {
          id: 2,
          name: "XYZ"
        }
      ]
    };
  },

  computed: {
    ...mapState("store", ["newStoreList", "storeList"]),
    ...mapState("breadcumbs", ["breadList"]),
    ...mapState("category", ["categoryList"])
  },

  // async asyncData({ store }) {
  //   try {
  //     await Promise.all([
  //       store.dispatch("store/getStoreList", { newStore: true }),
  //       store.dispatch("store/getStoreList", { pageSize: 6 }),
  //       store.dispatch("category/getCategoryList", { pageSize: 6 })
  //     ]);
  //   } catch (err) {
  //     console.log("indexAsyncData", err);
  //   }
  // },

  async created() {
    if (
      !this.newStoreList.length ||
      !this.storeList.length ||
      this.categoryList.length
    ) {
      await Promise.all([
        this.getStoreList({ newStore: true }),
        this.getStoreList({ pageSize: 6 }),
        this.getCategoryList({ pageSize: 6 })
      ]);
    }
  },

  mounted() {
    localStorage.setItem("cart", JSON.stringify({}));
    console.log("agvds");
  },

  methods: {
    ...mapActions("store", ["getStoreList"]),
    ...mapActions("breadcumbs", ["setBreadList"]),
    ...mapActions("category", ["getCategoryList"]),

    handleChooseStore(item) {
      const id = this.breadList.length + 1;
      const url = `/view-store/${item.id}`;
      const breadList = [
        {
          id: 1,
          name: "Trang chủ",
          url: "/"
        },
        { id, name: item.name, url }
      ];
      this.setBreadList(breadList);
      this.$router.push({ path: url });
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
}
</style>