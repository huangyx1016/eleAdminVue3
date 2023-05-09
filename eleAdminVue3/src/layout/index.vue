<template>
  <!-- layout 页面布局 -->
  <!-- el-aside的width设置为auto就能实现右侧content自动靠近 -->
  <el-container class="app-container">
    <!-- 侧边菜单栏 -->
    <el-aside width="auto" class="sidebar-container">
      <Menu />
    </el-aside>
    <el-container class="content">
      <!-- 右上角头部 -->
      <el-header><Headers /></el-header>
      <!-- transition标签单个过渡 appear指第一次就出现 name="过渡动画名"指明不同的过渡效果 -->
      <!-- 右下主页面 -->
      <el-main class="main-bg">
        <!-- 使用v-slot来进行路由的过渡动效 -->
        <RouterView v-slot="{ Component }">
          <transition name="slide" appear>
            <component :is="Component" />
          </transition>
        </RouterView>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, computed } from "vue";
import Menu from "./Menu/index.vue";
import Headers from "./headers/index.vue";
import { RouterLink, RouterView } from "vue-router";
import { useUserStore } from "@/stores/user";
const userStore = useUserStore();
const asideWidth = computed(() => {
  return userStore.getIsCollapse ? 50 + "px" : 210 + "px";
});
const show = ref(false);
</script>

<style lang="scss" scoped>
.app-container {
  position: relative;
  width: 100%;
  height: 100%;

  .sidebar-container {
    background: var(--menuBg);
    transition: 0.3s linear;
  }
  .content {
    // width: calc(100% - var(--sideBarWidth));
    height: 100%;
    transition: 0.3s;
    ::v-deep(.el-header) {
      padding: 0;
    }
  }
}
</style>
