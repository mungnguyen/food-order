<template>
  <v-carousel delimiter-icon="mdi-minus">
    <v-carousel-item v-for="(item, index) in items" :key="index" :src="item.src"></v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          src: "/images/Slider/food-order-slider-1.jpg"
        },
        {
          src: "/images/Slider/food-order-slider-2.jpg"
        },
        {
          src: "/images/Slider/food-order-slider-3.jpg"
        }
      ]
    };
  }
};
</script>