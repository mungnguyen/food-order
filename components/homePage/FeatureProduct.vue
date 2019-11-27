<template>
  <div class="feature-food">
    <h2>
      <center>
        <v-icon>mdi-food</v-icon>&nbsp;Sản phẩn nổi bật
      </center>
    </h2>
    <v-divider></v-divider>
    <v-row>
      <v-col cols="6" v-for="(item, index) in foodList" :key="index">
        <v-card shaped>
          <v-row>
            <v-col cols="4">
              <v-img :src="item.src"></v-img>
            </v-col>
            <v-col cols="8">
              <v-rating
                v-model="rating"
                background-color="orange lighten-3"
                color="orange"
                size="20px"
              ></v-rating>
              <p :class="{'food-name': true}">{{item.name}}}</p>
              <!-- <p>Số 1, Tạ Quang Bửu, Hai Bà Trưng, Hà Nội</p> -->
              <p :class="{'food-price': true}">{{ item.price }} VND</p>
              <v-btn small rounded color="#e49f02">Thêm vào giỏ hàng</v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      foodList: [
        {
          src: "/images/NewFood/food-4.jpg",
          name: "Whitehaven Beach",
          price: "120.000"
        },
        {
          src: "/images/NewFood/food-1.jpg",
          name: "Whitehaven Beach",
          price: "120.000"
        },
        {
          src: "/images/NewFood/food-2.jpg",
          name: "Whitehaven Beach",
          price: "120.000"
        },
        {
          src: "/images/NewFood/food-3.jpg",
          name: "Whitehaven Beach",
          price: "120.000"
        }
      ]
    };
  }
};
</script>

<style lang="scss">
.feature-food {
  margin-top: 5em;
}
</style>