<template>
  <!-- 这是面包屑组件el-breadcrumb  separator="/" 是分隔符 以/分割 可以改成图标分隔符 :separator-icon设置图标 -->
  <el-breadcrumb separator="/">
    <el-breadcrumb-item
      v-for="(item, index) in breadcrumbList"
      :key="index"
      :to="item.path"
      ><span>{{ item.meta.title }}</span></el-breadcrumb-item
    >
  </el-breadcrumb>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
const route = useRoute(); //使用路由的route
const breadcrumbList = ref([]); //定义面包屑的数组
//初始化面包屑
const initBreadcrumbList = () => {
  breadcrumbList.value = route.matched; //route.matched  一个数组，包含当前路由的所有嵌套路径片段的路由记录
  // console.log(route.matched);
};
//监听路由变化
watch(
  route,
  (val) => {
    initBreadcrumbList();
  },
  { deep: true, immediate: true } //开启深度监听，立即监听
);
</script>

<style lang="scss" scoped>
.no-redirect {
  color: #97a8be;
  cursor: text;
}
</style>
