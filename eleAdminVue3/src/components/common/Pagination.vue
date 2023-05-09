<template>
  <!-- element-plus分页组件简单封装 -->
  <el-pagination
    :current-page="currentPage"
    :page-size="pageSize"
    :page-sizes="pageSizes"
    :small="small"
    :disabled="disabled"
    :background="background"
    :layout="layout"
    :total="total"
    :hide-on-single-page="singleHide"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</template>

<script lang="ts" setup>
import { computed } from "vue";
//组件传参
// const props = defineProps({
//   currentPage: {
//     type: Number,
//     default: 1,
//   },
//   pageSize: {
//     type: Number,
//     default: 10,
//   },
//   pageSizes: {
//     type: Array,
//     default: [10, 20, 30],
//   },
//   small: {
//     type: Boolean,
//     default: false,
//   },
//   disabled: {
//     type: Boolean,
//     default: false,
//   },
//   background: {
//     type: Boolean,
//     default: true,
//   },
//   layout: {
//     type: String,
//     default: "total, sizes, prev, pager, next, jumper",
//   },
//   total: {
//     type: Number,
//     default: 1,
//   },
//   //只有一页是否隐藏分页
//   singleHide: {
//     type: Boolean,
//     default: true,
//   },
// });
// const emit = defineEmits(["change", "changeSize"]);
// //每页显示条数改变
// const handleSizeChange = (val) => {
//   emit("changeSize", val);
// };

// //页数改变
// const handleCurrentChange = (val) => {
//   emit("change", val);
// };

//定义参数接口interface 规定数据类型
interface props {
  currentPage: number; //当前页码
  pageSize: number; //每页条数
  pageSizes?: number[]; //每页显示个数选择器的选项设置
  small?: false; //是否使用小型分页样式
  disabled?: boolean; //是否禁用分页
  background?: boolean; //是否为分页按钮添加背景色
  layout: string; //组件布局，子组件名用逗号分隔
  total: number; //总条目数
  singleHide?: boolean; //只有一页时是否隐藏
}
//使用withDefaults定义默认值
const props = withDefaults(defineProps<props>(), {
  currentPage: 1,
  pageSize: 10,
  pageSizes: () => {
    return [10, 20, 30];
  },
  small: false,
  disabled: false,
  background: true,
  layout: "total, sizes, prev, pager, next, jumper",
  total: 0,
  singleHide: true,
});
const emit = defineEmits<{
  (e: "change", val: number);
  (e: "changeSize", val: number);
}>();
//当前页码改变
const handleCurrentChange = (val) => {
  emit("change", val);
};
//每页条数改变
const handleSizeChange = (val) => {
  emit("changeSize", val);
};
</script>

<style lang="scss" scoped></style>
