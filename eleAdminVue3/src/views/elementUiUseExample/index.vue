<template>
  <el-button>Default</el-button>
  <el-button type="primary" @click="handleClick">elementui按需导入</el-button>
  <el-button type="success">Success</el-button>
  <el-button type="info">Info</el-button>
  <el-button type="warning">Warning</el-button>
  <el-button type="danger">Danger</el-button>

  <div style="margin-top: 30px">
    <el-icon :size="20">
      <Edit />
    </el-icon>
    <el-icon color="#409EFC" class="no-inherit">
      <Share />
    </el-icon>
    <el-icon>
      <Delete />
    </el-icon>
    <el-icon class="is-loading">
      <Loading />
    </el-icon>
    <el-button type="primary">
      <el-icon style="vertical-align: middle">
        <Search />
      </el-icon>
      <span style="vertical-align: middle"> Search </span>
    </el-button>
    <el-icon>
      <View />
    </el-icon>
  </div>
  <div style="margin-top: 30px">
    <el-button :plain="true" @click="open2">success</el-button>
    <el-button :plain="true" @click="open3">warning</el-button>
    <el-button :plain="true" @click="open1">message</el-button>
    <el-button :plain="true" @click="open4">error</el-button>
  </div>
</template>

<script lang="ts" setup>
import { ElMessage } from "element-plus";
import { reactive, toRefs, onMounted, getCurrentInstance } from "vue";
const handleClick = () => {
  ElMessage.success("element-ui按需导入成功!");
};

const open1 = () => {
  ElMessage("this is a message.");
};
const open2 = () => {
  ElMessage({
    message: "Congrats, this is a success message.",
    type: "success",
  });
};
const open3 = () => {
  ElMessage({
    message: "Warning, this is a warning message.",
    type: "warning",
  });
};
const open4 = () => {
  ElMessage.error("Oops, this is a error message.");
};
</script>
<style lang="scss" scoped></style>
