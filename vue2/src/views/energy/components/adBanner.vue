<template>
  <div class="ad-banner-container">
    <img v-if="adImg" :src="adImg" alt="" />
    <img v-else src="../../../assets/ad.png" alt="" />
  </div>
</template>

<script>
export default {
  name: 'adBanner',
  props: {
    adImg: { type: String, default: '' }
  }
}
</script>

<style lang="scss">
.ad-banner-container {
  width: 100%;
  height: 80px;
  margin: 30px 0;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
