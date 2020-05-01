<template>
  <div class="feature-food">
    <h2>
      <center>
        <v-icon>mdi-food</v-icon>&nbsp;Danh sách cửa hàng
      </center>
    </h2>
    <v-divider></v-divider>
    <div style="position: relative">
      <v-overlay :value="overlay" absolute>
        <v-progress-circular indeterminate color="light-blue" size="32" dense></v-progress-circular>
      </v-overlay>

      <v-row>
        <v-col cols="4" v-for="(item, index) in storeList" :key="index">
          <v-card shaped>
            <v-row>
              <v-col cols="4">
                <v-img :src="item.url_image"></v-img>
              </v-col>
              <v-col cols="8">
                <v-rating
                  v-model="rating"
                  background-color="orange lighten-3"
                  color="orange"
                  size="20px"
                ></v-rating>
                <p
                  :class="{'food-name': true}"
                  style="cursor: pointer"
                  @click="$emit('showStore', item)"
                >{{item.name}}</p>
                <!-- <p>Số 1, Tạ Quang Bửu, Hai Bà Trưng, Hà Nội</p> -->
                <p :class="{'food-price': true}">{{ item.address }}</p>
                <v-btn small rounded color="#e49f02">Thêm vào giỏ hàng</v-btn>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <v-pagination
      v-model="paginationValue.page"
      :length="paginationValue.length"
      circle
      @input="handleChangePagination"
    ></v-pagination>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      overlay: false
    };
  },

  computed: {
    ...mapState("store", ["storeList", "pagination"]),

    paginationValue() {
      const page = Number(this.pagination.page) + 1;
      const length = Math.ceil(
        Number(this.pagination.total) / Number(this.pagination.pageSize)
      );
      return {
        page: page,
        length: length
      };
    }
  },

  methods: {
    ...mapActions("store", ["getStoreList"]),
    async handleChangePagination(value) {
      this.overlay = true;

      const page = Number(value) - 1;
      await this.getStoreList({ page: page, pageSize: 6 });

      this.overlay = false;
    }
  }
};
</script>

<style lang="scss">
.feature-food {
  margin-top: 5em;
}
</style>