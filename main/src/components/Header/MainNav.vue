<template>
  <div class="main-nav-container">
    <div class="main-nav-content">
      <!-- logo内容 -->
      <div class="main-nav-logo">
        <img src="" alt="" />
      </div>

      <!-- 导航列表详情 -->
      <div class="main-nav-list">
        <div
          v-for="(item, index) in NAV_LIST"
          :class="{ 'main-nav-active': currentIndex === index }"
          :key="index"
          @click="setCurrentIndex(item, index)"
        >
          {{ item.name }}
        </div>
      </div>

      <!-- 搜索 -->
      <div class="main-nav-search">
        <div class="main-nav-search-icon">
          <img src="../../assets/blue-search.png" alt="" />
        </div>
        <div class="main-nav-search-input">
          <input type="text" id="main-nav-search" v-if="searchStatus" @blur="setSearchStatus(false)" />
          <div class="main-nav-search-input-fake" v-else @click="setSearchStatus(true)">快速搜索</div>
        </div>
        <div class="main-nav-search-button">搜索</div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, nextTick, watch } from 'vue'
// import { headerState } from '../../store'
import { NAV_LIST } from '../../const/nav'
import { useRouter, useRoute } from 'vue-router'

export default {
  name: 'MainNav',
  setup() {
    const currentIndex = ref(0)
    const router = useRouter()
    const route = useRoute()

    watch(
      route,
      (newVal) => {
        for (let i = 0, len = NAV_LIST.length; i < len; i++) {
          if (NAV_LIST[i].url && newVal.fullPath.indexOf(NAV_LIST[i].url) !== -1) {
            // headerState.setCurrentIndex(i)
            currentIndex.value = i
            return
          }
        }
      },
      { deep: true }
    )

    // 搜索是否得焦
    let searchStatus = ref(false)

    const setSearchStatus = (type) => {
      searchStatus.value = type

      if (!type) {
        return
      }
      // 得焦的情况下，让input自动获取焦点
      nextTick(() => {
        const input = document.getElementById('main-nav-search')
        if (input) {
          input.focus()
        }
      })
    }

    const setCurrentIndex = (item, index) => {
      console.log(item)
      if (item.url === route.fullPath) return
      currentIndex.value = index
      router.push(`${item.url}`)
    }

    return {
      NAV_LIST,
      currentIndex,
      setCurrentIndex,
      searchStatus,
      setSearchStatus
    }
  }
}
</script>

<style lang="scss" scoped>
* img {
  width: 100%;
  height: 100%;
}
.main-nav {
  &-content {
    width: 1200px;
    height: 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;
  }
  &-container {
    width: 100%;
    height: 90px;
    background: linear-gradient(180deg, #3c6afb 0%, #75cdff 100%);
  }
  &-logo {
    width: 108px;
    height: 48px;
    opacity: 0;
  }
  &-list {
    margin: 0 136px 0 132px;
    font-size: 24px;
    font-weight: bold;
    color: #ffffff;
    display: flex;
    height: 100%;
    user-select: none;

    & > div {
      position: relative;
      margin-right: 30px;
      height: 100%;
      display: flex;
      align-items: center;
      cursor: pointer;
    }
    & > div:last-child {
      margin-right: 0;
    }
  }
  &-active:after {
    content: '';
    width: 100%;
    height: 8px;
    background: #f7b500;
    position: absolute;
    bottom: 0;
    left: 0;
  }
  &-search {
    width: 260px;
    height: 40px;
    background: linear-gradient(90deg, #f4f8ff 0%, #e0ebff 100%) #ffffff;
    border-radius: 8px;
    position: relative;

    &-icon {
      width: 20px;
      height: 20px;
      position: absolute;
      top: 11px;
      left: 21px;
    }

    &-input {
      width: 170px;
      height: 100%;
      position: absolute;
      left: 41px;

      &-fake {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        padding-left: 6px;
        color: #61aee9;
        display: flex;
        align-items: center;
      }

      input {
        width: 100%;
        height: 100%;
        border: 0;
        outline: none;
        font-size: 16px;
        padding-left: 6px;
        background: transparent;
      }
    }

    &-button {
      width: 52px;
      height: 40px;
      background: linear-gradient(90deg, #f4f8ff 0%, #e0ebff 100%) #e0ebff;
      border-radius: 0px 8px 8px 0px;
      position: absolute;
      top: 0;
      right: 0;
      font-size: 14px;
      color: #0091ff;
      line-height: 19px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
