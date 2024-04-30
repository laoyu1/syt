<template>
  <div class="container">
    <!-- 顶部全局组件 -->
    <HospitalTop></HospitalTop>
    <!-- 展示路由组件的区域 -->
    <div class="content">
        <!-- 展示路由组件的区域 -->
        <router-view></router-view>
      
    </div>
    <!-- 底部 -->
    <HospitalButton></HospitalButton>
    <!-- 登录组件 -->
    <Login v-if="userStore.visiable"></Login>
  </div>
</template>

<script setup lang="ts">
// 引入用户仓库
import useUserStore from './store/modules/interface/user';
let userStore = useUserStore()

</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  align-items: center;

  .content {
    margin-top: 80px;
    width: 1200px;
    min-height: 700px;

  }
}
</style>