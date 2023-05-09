<template>
  <!-- 这边不能包含一个div 否则会有侧边栏折叠后文字不消失的问题 -->
  <!--if包含子级-->
  <el-sub-menu
    :key="item.id"
    :index="'/' + item.path"
    v-if="item.children && item.children.length > 0"
  >
    <template #title>
      <!-- <i :class="item.icon"></i> -->
      <el-icon><Setting /></el-icon>
      <span>{{ item.authName }}</span>
    </template>
    <!-- 递归调用自己 -->
    <MenuItem
      v-for="child in item.children"
      :key="child.path"
      :parent="item.path"
      :item="child"
    />
  </el-sub-menu>
  <!--else不包含子级-->

  <!--路由跳转path-->
  <div v-else>
    <el-menu-item
      :key="item.id"
      :index="'/' + item.path"
      @click="savePath(item.path)"
    >
      <el-icon><Setting /></el-icon>
      <span>{{ item.authName }}</span>
    </el-menu-item>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import { RouterLink, RouterView } from "vue-router";
const props = defineProps({
  item: Object,
  parent: String,
});
const emits = defineEmits(["savePath"]);
//保存当前打开的路由路径path到sessionStorage里  用于登录还未失效时刷新页面，赋值菜单默认
const savePath = (path) => {
  sessionStorage.setItem("path", `/${path}`);
};
</script>

<style lang="scss" scoped></style>
