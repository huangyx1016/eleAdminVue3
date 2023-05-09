<template>
  <!-- 公共选项卡组件  背景色切换 -->
  <div class="tab-box">
    <div
      class="tab-items"
      v-for="(item, index) in tabList"
      :key="index"
      :class="{ 'tab-active': curTabIndex === item.index }"
      @click="setTabIndex(item)"
    >
      {{ item.label }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
type tabListType = {
  index: number;
  label: string;
};
interface IProps<T> {
  tabList?: T[];
}
const props = withDefaults(defineProps<IProps<tabListType>>(), {
  tabList: () => [
    { index: 1, label: "tab1" },
    { index: 2, label: "tab2" },
    { index: 3, label: "tab3" },
  ],
});
const curTabIndex = ref(1); //当前选项卡下标
const emit = defineEmits<{
  (e: "change", value: number): void;
}>();
const setTabIndex = (item) => {
  if (item.index !== curTabIndex) {
    curTabIndex.value = item.index;
    emit("change", item);
  }
};
</script>

<style lang="scss" scoped>
.tab-box {
  display: flex;
  border-radius: 5px;
  align-items: center;
  .tab-items {
    height: 50px;
    padding: 10px;
    line-height: 30px;
    box-sizing: border-box;
    font-size: 18px;
    color: #333;
    background-color: deepskyblue;
    cursor: pointer;
    &:nth-of-type(1) {
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
    }
    &:last-child {
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
    }
  }
  .tab-active {
    background-color: dodgerblue;
    color: white;
  }
}
</style>
