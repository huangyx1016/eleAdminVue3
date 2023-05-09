<template>
  <!-- 全屏  使用全屏插件screenfull   npm install --save screenfull  官网：https://github.com/sindresorhus/screenfull.js -->
  <!-- svg--icon 组件可以结合 el-icon使用 可以在外层套一个el-icon -->
  <!-- <el-icon :size="40"> -->
  <!-- <FullScreen
      @click="fullScreen"
      v-if="!isFullScreen"
      style="color: dodgerblue"
    />
    <CloseBold @click="fullScreen" v-else style="color: dodgerblue" /> -->
  <!-- <svg-icon iconName="icon-eye-open" color="red"></svg-icon> -->
  <svg-icon
    iconName="icon-quanping"
    className="full-screen-icon"
    color="#409EFF"
    size="40px"
    title="全屏"
    @click="fullScreen"
    v-if="!isFullScreen"
  ></svg-icon>
  <svg-icon
    iconName="icon-quxiaoquanping"
    className="quxiaoquanping"
    color="#409EFF"
    size="40px"
    title="退出全屏"
    @click="fullScreen"
    v-else
  ></svg-icon>
  <!-- </el-icon> -->
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeMount } from "vue";
import { ElMessage } from "element-plus";
import screenfull from "screenfull"; //这里使用的是screenfull.js插件
import SvgIcon from "@/components/SvgIcon.vue";
const isFullScreen = ref(screenfull.isFullscreen);
const fullScreen = () => {
  //判断浏览器是否支持
  if (!screenfull.isEnabled) {
    ElMessage.warning("you browser can not work");
    return false;
  }
  screenfull.toggle(); //切换全屏
};
//改变图标的方法
const changeIcon = () => {
  isFullScreen.value = screenfull.isFullscreen;
};
onMounted(() => {
  screenfull.on("change", changeIcon);
});
onBeforeMount(() => {
  screenfull.off("change", changeIcon);
});
</script>

<style lang="scss" scoped>
// .full-screen-icon {
//   cursor: pointer;
//   width: 40px;
//   height: 40px;
// }
</style>
