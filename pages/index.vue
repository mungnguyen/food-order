<template>
  <div class="home">
    <Slider />
    <br />
    <NewStore />
    <StoreList />

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
          name: "ABC"
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
    ...mapState("breadcumbs", ["breadList"])
  },

  // async asyncData({ store }) {
  //   try {
  //     await Promise.all([
  //       store.dispatch("store/getStoreList", { newStore: true }),
  //       store.dispatch("store/getStoreList", { pageSize: 6 })
  //     ]);
  //   } catch (err) {
  //     console.log("indexAsyncData", err);
  //   }
  // },

  // async created() {
  //   if (!this.newStoreList.length || !this.storeList.length) {
  //     await Promise.all([
  //       this.getStoreList({ newStore: true }),
  //       this.getStoreList({ pageSize: 6 })
  //     ]);
  //   }
  // },

  mounted() {
    localStorage.setItem("cart", JSON.stringify({}));
  },

  methods: {
    ...mapActions("store", ["getStoreList"]),
    ...mapActions("breadcumbs", ["addBreadcumbs"]),

    handleChooseStore(item) {
      const id = this.breadList.length + 1;
      const url = `/store/${id}`;
      this.addBreadcumbs({ id, name: item.name, url });
      this.$router.push(url);
    }
  }
};
</script>

<style scoped>
.home {
  width: 100%;
}
</style>