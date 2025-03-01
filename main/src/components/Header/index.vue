<template>
  <!-- 用户信息 -->
  <UserInfo />
  <!-- 导航 -->
  <MainNav />
</template>

<script>
import UserInfo from './user-info.vue'
import MainNav from './main-nav.vue'

export default {
  name: 'Header',
  components: { UserInfo, MainNav }
}
</script>

<style lang="scss" scoped></style>
