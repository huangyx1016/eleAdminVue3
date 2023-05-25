<template>
  <!-- 公共组件使用 -->
  <el-select v-model="selectVal" id="inputBox">
    <template #empty>
      <!-- <Teleport to="body"> -->
      <div style="width: 900px; height: 600px; border: 1px solid black"></div>
      <!-- </Teleport> -->
    </template>
    <!-- <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    >
    </el-option> -->
  </el-select>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import TeleportComponents from "./components/TeleportComponents.vue";
const selectVal = ref();
const options = [
  // {
  //   value: 1,
  //   label: "Option1",
  // },
  // {
  //   value: 2,
  //   label: "Option2",
  // },
  // {
  //   value: 3,
  //   label: "Option3",
  // },
  // {
  //   value: 4,
  //   label: "Option4",
  // },
  // {
  //   value: 5,
  //   label: "Option5",
  // },
];
</script>

<style lang="scss" scoped></style>
