<template>
  <!-- 菜单子项  渲染静态菜单数据-->
  <!-- 注意：这边外层不能包含一个div 否则会有侧边栏折叠后文字不消失的问题 -->
  <!--if包含子级  多级菜单-->
  <el-sub-menu
    :index="item.path"
    v-if="item.children && item.children.length > 0"
  >
    <template #title>
      <el-icon>
        <component :is="item.meta.icon"></component>
      </el-icon>
      <!-- <span>{{ item.meta.title }}</span> -->
      <span>{{ $t(`menus.${item.name}`) }}</span>
    </template>
    <!-- 组件递归调用自己 -->
    <MenuItemStatic
      v-for="child in item.children"
      :key="child.path"
      :parent="item.path"
      :item="child"
    />
  </el-sub-menu>

  <!--else不包含子级 只有一级的菜单  这里的index是菜单项的唯一标识-->
  <el-menu-item v-else :index="item.path">
    <el-icon> <component :is="item.meta.icon"></component></el-icon>
    <!-- <span>{{ item.meta.title }}</span> -->
    <span>{{ $t(`menus.${item.name}`) }}</span>
  </el-menu-item>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, Fragment } from "vue";
const props = defineProps({
  item: Object,
  parent: String, //父级的路径
});
</script>

<style lang="scss" scoped></style>
