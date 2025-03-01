<template>
  <!-- 用户信息 -->
  <UserInfo />
  <!-- 导航 -->
  <MainNav />
</template>

<script>
import UserInfo from './UserInfo.vue'
import MainNav from './MainNav.vue'

export default {
  name: 'Header',
  components: { UserInfo, MainNav }
}
</script>

<style lang="scss" scoped></style>
