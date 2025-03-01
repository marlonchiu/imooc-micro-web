<template>
  <div class="micro-main-body-container">
    <Loading v-show="loadingStatus"></Loading>

    <!-- 子应用容器 -->
    <!-- <div id="micro-container" v-show="!loadingStatus"></div> -->
  </div>
</template>

<script>
import { ref } from 'vue'
import Loading from './loading.vue'
export default {
  name: 'micro-body',
  components: { Loading },
  setup() {
    const loadingStatus = ref(true)
    return {
      loadingStatus
    }
  }
}
</script>

<style>
.micro-main-body-container {
  min-height: 100%;
  position: relative;
}
#micro-container {
  width: 100%;
  min-height: 100%;
}
</style>
