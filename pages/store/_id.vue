<template>
  <div class="store">
    <v-breadcrumbs :items="breadList" divider=">>">
      <template v-slot:item="props">
        <v-breadcrumbs-item @click="handleChooseBread(props.item)">{{ props.item.name }}</v-breadcrumbs-item>
      </template>
    </v-breadcrumbs>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {};
  },

  computed: {
    ...mapState("breadcumbs", ["breadList"])
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