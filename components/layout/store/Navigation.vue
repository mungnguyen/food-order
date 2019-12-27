<template>
  <v-navigation-drawer :clipped="$vuetify.breakpoint.mdAndUp" app>
    <v-list max-height="100%" nav>
      <template v-for="(item, index) in items">
        <v-list-item :key="index" :to="item.link">
          <v-list-item-action>
            <span>{{ item.name }}</span>
          </v-list-item-action>
          <!-- <v-list-item-content>
            <v-list-item-title class="grey--text">{{ item.name }}</v-list-item-title>
          </v-list-item-content> -->
        </v-list-item>
      </template>
        </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      drawer: true,
      items: [
        {
          name: "Quản lý đơn hàng",
         
              link: "/store/order-management"
          
        },
        {
          name: "Quản lý món ăn",
          
              link: "store/dish-management"
         
        }
      ]
    };
  }
};
</script>
<style>
.v-navigation-drawer--temporary.v-navigation-drawer--clipped {
  z-index: 5;
  padding-top: 64px;
}
</style>