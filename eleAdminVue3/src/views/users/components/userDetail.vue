<template>
  <!-- 用户详情页面 -->
  <el-descriptions :column="1" size="default" border>
    <el-descriptions-item width="100" label="用户名">{{
      model?.username
    }}</el-descriptions-item>
    <el-descriptions-item width="100" label="电话号码">{{
      model?.mobile
    }}</el-descriptions-item>
    <el-descriptions-item width="100" label="邮箱">{{
      model?.email
    }}</el-descriptions-item>
    <el-descriptions-item width="100" label="角色">{{
      model?.role_name
    }}</el-descriptions-item>
    <el-descriptions-item width="100" label="状态">{{
      model?.mg_state
    }}</el-descriptions-item>
    <el-descriptions-item width="100" label="创建时间">{{
      model?.create_time
    }}</el-descriptions-item>
  </el-descriptions>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import type { User } from "../type";
import { getUserById } from "@/api/user";
const props = defineProps<{
  id: number;
}>();
const model = ref<User>();
/**
 * @description 根据用户id获取用户详情信息接口方法
 * @param id 用户id
 */
const getUserByIdHandle = async (id) => {
  let res: any = await getUserById(id);
  // console.log("res", res);
  if (res.meta.status === 200 && res.data) {
    model.value = res.data; //赋值数据用于回显
  }
};
//如果id存在 发送请求根据id获取用户信息
if (props.id) {
  getUserByIdHandle(props.id);
}
</script>

<style lang="scss" scoped></style>
