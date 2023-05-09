<template>
  <!-- 实时获取当前系统时间组件 -->
  <div class="current-time-box">
    {{ currentTime }}
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { getNowFormatTime } from "@/utils/getNowFormatTime";
const currentTime = ref(""); //当前系统时间
//每秒刷新当前时间
const freshCurrentTime = () => {
  currentTime.value = getNowFormatTime(); //这里默认是以yyyy-MM-dd HH:mm:ss格式的时间  可以传入连接符号
};
//每1秒获取一次当前时间
setInterval(freshCurrentTime, 1000);
</script>

<style lang="scss" scoped>
.current-time-box {
  color: #333;
  font-size: 16px;
  margin-right: 10px;
}
</style>
