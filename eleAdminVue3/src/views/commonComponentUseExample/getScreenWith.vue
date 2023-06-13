<template>
  <!-- 监听页面缩放,获取页面宽高值 -->
  <div>
    <p>页面宽度:{{ screenWidth }}</p>
    <p>页面高度:{{ screenHeight }}</p>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
const screenWidth = ref(0); //页面宽度
const screenHeight = ref(0); //页面高度
onMounted(() => {
  //页面缩放的回调函数 window.onresize=()=>{}
  window.onresize = () => {
    screenWidth.value = document.body.clientWidth;
    screenHeight.value = document.body.clientHeight;
  };
});
</script>

<style lang="scss" scoped></style>
