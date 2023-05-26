<template>
  <!-- 折叠按钮组件  根据折叠状态显示不同按钮-->
  <el-icon
    :size="20"
    class="collapse-icon"
    @click="userStore.changeIsCollapse()"
  >
    <Fold v-show="!userStore.getIsCollapse" />
    <Expand v-show="userStore.getIsCollapse" />
  </el-icon>
</template>

<script lang="ts" setup>
import { useUserStore } from "@/stores/modules/user";
const userStore = useUserStore(); //使用pinia useUserStore
</script>

<style lang="scss" scoped></style>
