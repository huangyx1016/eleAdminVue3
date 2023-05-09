<template>
  <!-- 封装的SvgIcon图标组件  可以结合iconfont阿里图标库使用 也可以使用本地的svg图片  这里使用本地svg图片使用的是 vite-plugin-svg-icons 插件-->
  <!-- 把 aria-hidden="true" 加到元素上会把该元素和它的所有子元素从可访问性树上移除 -->
  <svg :class="svgClass" :style="styleObject" aria-hidden="true">
    <title>{{ title }}</title>
    <use :xlink:href="iconClassName" :fill="color" />
  </svg>
</template>
<script setup lang="ts">
import { computed } from "vue";
const props = defineProps({
  //图标名称
  iconName: {
    type: String,
    required: true,
  },
  //类名
  className: {
    type: String,
    default: "",
  },
  //图标颜色
  color: {
    type: String,
    default: "#409eff",
  },
  //图标的大小
  size: {
    type: String,
    default: "40px",
  },
  //是否有鼠标小手的样式效果 cursor:pointer
  clickable: {
    type: Boolean,
    default: true, //默认有
  },
  //鼠标移入svg图标显示的提示信息title
  title: {
    type: String,
    default: "提示", //默认移入显示"提示"
  },
});
// 图标在 iconfont 中的名字
const iconClassName = computed(() => {
  return `#${props.iconName}`; //xlink:href
});
// 给图标添加上类名
const svgClass = computed(() => {
  //如果传入了类名 返回多个类名
  if (props.className) {
    return `svg-icon ${props.className}`;
  }
  return "svg-icon"; //否则返回svg-icon类名
});

//计算属性返回cursor:pointer 动态style行内样式
const styleObject = computed(() => {
  return {
    // width: props.size,
    // height: props.size,
    cursor: props.clickable ? "pointer" : "",
  };
});
</script>
<style lang="scss" scoped>
.svg-icon {
  width: v-bind(size);
  height: v-bind(size);
  position: relative;
  fill: currentColor;
  vertical-align: -2px;
}
</style>
