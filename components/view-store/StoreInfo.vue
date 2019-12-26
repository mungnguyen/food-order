<template>
  <v-row class="view-store-info">
    <v-col cols="5">
      <v-img class="mx-auto" max-width="500px" max-height="350px" :src="viewStore.url_image"></v-img>
    </v-col>
    <v-divider vertical light></v-divider>
    <v-col cols="6">
      <div class="store" color="blue-dark">
        <v-breadcrumbs :items="breadList" divider=">>">
          <template v-slot:item="props">
            <v-breadcrumbs-item
              style="cursor: pointer; color: blue"
              @click="handleChooseBread(props.item)"
            >{{ props.item.name }}</v-breadcrumbs-item>
          </template>
        </v-breadcrumbs>
      </div>

      <div class="detail-store">
        <h2 class="name-store">{{viewStore.name}}</h2>
        <div class="address-store">
          <i>{{viewStore.address}}</i>
        </div>
        <v-rating
          class="rating-store"
          color="orange darken-2"
          background-color="orange lighten-3"
          :hover="true"
        ></v-rating>
        <br />
        <v-icon>mdi-calendar-clock</v-icon>Mở cửa:
        <label>{{viewStore.open_time}} - {{viewStore.close_time}}</label>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {};
  },

  computed: {
    ...mapState("breadcumbs", ["breadList"]),
    ...mapState("store", ["viewStore"])
  },

  methods: {
    ...mapActions("breadcumbs", ["goBreadcumbs"]),

    handleChooseBread(bread) {
      this.goBreadcumbs(bread.id);
      this.$router.push(bread.url);
    }
  }
};
</script>

<style lang="scss">
.view-store-info {
  .detail-store {
    padding-left: 4%;
  }
}
</style>