<template>
  <!--vue3 vite echarts 图表组件 -->
  <div class="chart-container" ref="chartRef"></div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch, onBeforeUnmount } from "vue";
import * as echarts from "echarts"; //项目中引入echarts   依赖安装命令：npm install echarts --save
//子组件接收的参数
const props = defineProps({
  //echarts图表配置参数
  option: {
    type: Object, //数据类型 Object
    default: () => {
      return {};
    }, //默认值
  },
});
const chartRef = ref(); //echarts图表容器ref
const myChart = ref(); //echarts图表
//初始化echarts图表的方法
const initGraph = () => {
  // 基于准备好的dom，初始化echarts实例
  myChart.value = echarts.init(chartRef.value);
  myChart.value.setOption(props.option); //设置option配置
  // 添加窗口改变监听
  myChart.value._resize = () => {
    myChart.value.resize(); //如果窗口大小改变了，就跟着调整图表的大小
  };
  window.addEventListener("resize", myChart.value._resize); //添加resize事件
};

//监听配置option的值变化  只要option值改变了就重新渲染echarts图表
watch(
  props.option,
  (newVal, oldVal) => {
    myChart.value.setOption(newVal);
  },
  { immediate: true } //立即监听
);

//onBeforeUnmount相当于vue2的beforeDestroyed 生命周期
onBeforeUnmount(() => {
  // 移除窗口改变resize事件
  window.removeEventListener("resize", myChart.value._resize);
});

onMounted(() => {
  initGraph(); //初始化echarts图表
});
</script>

<style lang="scss" scoped>
.chart-container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
</style>
