<template>
  <div>
    <van-swipe :autoplay="0" indicator-color="white">
      <van-swipe-item v-for="(img,i) in imgs" :key="i">
        <img :src="img" alt class="swiper" @click="gotoHome(i)">
      </van-swipe-item>
    </van-swipe>
  </div>
</template>
<script>
export default {
  name: "guide",
  data() {
    return {
      imgs: [
        require("@/assets/images/slide1.png"),
        require("@/assets/images/slide2.png"),
        require("@/assets/images/slide3.png"),
        require("@/assets/images/slide4.png")
      ]
    };
  },
  methods: {
    gotoHome(i) {
      if (i == this.imgs.length - 1) {
        this.$router.push({ name: "home" });
      }
    }
  },
  mounted() {
    if (localStorage.count) {
      localStorage.count++;
      if (localStorage.count > 2) {
        this.$router.push({ name: "home" });
      }
    } else {
      localStorage.count = 1;
    }
  }
};
</script>

<style scoped>
.guide .swiper {
  width: 100%;
  height: 100%;
}
</style>



