<template>
  <!-- element-plus搜索框公共组件 -->
  <el-input
    :placeholder="placeholder"
    v-model="content"
    :prefix-icon="loading ? Loading : Search"
    :disabled="disabled ? loading : disabled"
    :clearable="clearable"
    @keyup.enter="handleKeyUp"
    @input="inputHandle"
    ref="searchDom"
  ></el-input>
</template>

<script lang="ts" setup>
import { ref, watch, nextTick } from "vue";
import { Search, Loading } from "@element-plus/icons-vue";
const props = defineProps({
  searchValue: String,
  // 搜索加载中
  loading: {
    type: Boolean,
    default: false,
  },
  // 搜索框提示内容
  placeholder: String,
  // 搜索框样式
  searchStyle: Object,
  // 是否禁用搜索框、或者只禁用搜索图标
  disabled: {
    type: Boolean,
    default: true,
  },
  // 是否可清空
  clearable: {
    type: Boolean,
    default: true,
  },
  //是否防抖,防抖时间,传0表示不防抖
  delay: {
    type: Number,
    default: 500,
  },
});
const content = ref(""); //input content内容
const timer = ref(null); //定时器
const searchDom = ref(); //搜索框ref
const emit = defineEmits(["search", "changeInput", "update:searchValue"]);
//键盘回车搜索
const handleKeyUp = () => {
  emit("search");
};
//@input事件
const inputHandle = (val) => {
  emit("update:searchValue", val); //更新绑定的searchValue值
  if (props.delay) {
    debounce(handleChange, props.delay);
  } else {
    handleChange();
  }
};
//值一改变就进行搜索
const handleChange = () => {
  emit("changeInput", content);
};
/**
 * 防抖
 * @param fn
 * @param delay 防抖时间
 */
const debounce = (fn, delay) => {
  if (timer.value) clearTimeout(timer.value);
  timer.value = setTimeout(fn, delay);
};

watch(
  () => props.searchValue,
  (val) => {
    content.value = val;
  },
  { immediate: true }
);

watch(
  () => props.searchStyle,
  (val) => {
    // nextTick(() => {
    //   console.log("searchDom", JSON.parse(JSON.stringify(searchDom.value)));
    // });
    for (var prop in val) {
      ((prop, value) => {
        if (typeof value === "number") {
          nextTick(() => {
            searchDom.value.input.style[prop] = value + "px";
          });
        } else if (typeof value === "string") {
          nextTick(() => {
            searchDom.value.input.style[prop] = value;
          });
        }
      })(prop, val[prop]);
    }
  },
  { immediate: true }
);
</script>

<style lang="scss" scoped></style>
