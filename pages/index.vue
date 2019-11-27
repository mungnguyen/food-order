<template>
  <div class="home">
    <Slider />
    <br />
    <NewFood />
    <FeatureProduct />
  </div>
</template>

<script>
import Slider from "@/components/homePage/Slider";
import NewFood from "@/components/homePage/NewFood";
import FeatureProduct from "../components/homePage/FeatureProduct";

export default {
  components: {
    Slider,
    NewFood,
    FeatureProduct
  }
};
</script>

<style scoped>
.home {
  width: 100%;
}
</style>