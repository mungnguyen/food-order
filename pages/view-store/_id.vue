<template>
  <v-container>
    <v-row>
      <v-col cols="5">
        <v-img class="mx-auto" max-width="500px" max-height="350px" :src="store.url_image"></v-img>
      </v-col>
      <v-divider vertical light></v-divider>
      <v-col cols="5">
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
        <v-card class="max-auto" max-width="500px" max-height="350">
          <v-card-text>
            <div class="detail-store">
              <div class="name-store">{{store.name}}</div>
              <div class="address-store">{{store.address}}</div>
              <v-rating
                class="rating-store"
                color="orange darken-2"
                background-color="orange lighten-3"
                hover="true"
              ></v-rating>
              <v-card-text>
                <v-icon>mdi-calendar-clock</v-icon>
                <label>{{store.open_time}} - {{store.close_time}}</label>
              </v-card-text>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="2">
        <v-card shaped>
          <v-card-title class="layout justify-center">
            <span class="headline">Thực đơn</span>
          </v-card-title>

          <v-spacer></v-spacer>
          <v-card-actions v-for="(item,index) in categories" :key="index">
            <span class="text-center" color>{{item.name}}</span>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      store: {
        name: "Món ăn Việt - 80 Đại La",
        email: "kingbbq@gmail.com",
        password: "123456",
        phone: 1234567,
        address: "80 Đại La, Đồng Tâm, Hai Bà Trưng, Hà Nội",
        url_image:
          "http://kenh14cdn.com/thumb_w/660/2017/10-crop-1509403824788.jpg",
        open_time: "6:00",
        close_time: "18:00",
        status: "unlock"
      },
      categories: [
        {
          name: "MÓN BÁNH"
        },
        {
          name: "MÓN CHÈ"
        }
      ]
    };
  },

  computed: {
    ...mapState("breadcumbs", ["breadList"])
  },

  created() {
    console.log("abc");
    console.log("id", this.$router.params);
  },

  mounted() {
    console.log("123", this.$route.params);
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
<style scoped>
.theme--light.v-application {
  color: darkgoldenrod;
}
.v-application ul {
  padding-left: 0px;
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