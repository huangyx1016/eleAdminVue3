<template>
  <!-- 公共选项卡组件  滑动效果-->
  <div class="tab-box">
    <div
      class="tab-items"
      v-for="(item, index) in tabList"
      :style="{ width: `${tabWidth}px` }"
      :key="index"
      @click="setTabIndex(item)"
    >
      <p
        class="tab-title"
        :class="{ 'high-light': curTabIndex === item.index }"
      >
        {{ item.label }}
      </p>
    </div>
    <div
      class="bottom-box"
      :style="{
        transform: `translate(${transformX}px)`,
        width: `${tabWidth}px`,
      }"
    ></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
//选项卡数据类型
type tabListType = {
  index: number;
  label: string;
};
//定义props参数的接口
interface IProps<T> {
  tabList?: T[];
  tabWidth?: number;
  modelValue: number; //v-model双向数据绑定的值  父组件会使用v-model来绑定当前的选项卡index
}
//withDefaults(defineProps<>()) 设置props的默认值
const props = withDefaults(defineProps<IProps<tabListType>>(), {
  tabList: () => [
    { index: 1, label: "tab1" },
    { index: 2, label: "tab2" },
    { index: 3, label: "tab3" },
  ],
  tabWidth: 80, //底部bottom的长度
});
const curTabIndex = ref(1); //当前选项卡下标
//defineEmits<{}>() 自定义事件 这里都是配合ts的写法
const emit = defineEmits<{
  (e: "change", value: number): void;
  (e: "update:modelValue", value: number): void;
}>();
/**
 * 点击设置当前选项下标的值
 * @param item 选项卡整项的值
 */
const setTabIndex = (item) => {
  if (item.index !== curTabIndex.value) {
    curTabIndex.value = item.index; //设置当前的下标
    emit("update:modelValue", curTabIndex.value); //自定义事件 更新v-model绑定的tab值
    emit("change", item);
  }
};

//计算属性计算每次移动的tab的长度  = 选项卡宽度*(当前选项卡下标-1)
const transformX = computed(() => props.tabWidth * (curTabIndex.value - 1));
</script>

<style lang="scss" scoped>
.tab-box {
  display: flex;
  border-radius: 5px;
  align-items: center;
  position: relative;
  .tab-items {
    height: 50px;
    padding: 10px 20px;
    line-height: 30px;
    box-sizing: border-box;
    cursor: pointer;
    .tab-title {
      font-size: 18px;
      color: #333;
      text-align: center;
    }
    .high-light {
      color: skyblue;
    }
  }
  .bottom-box {
    // width: v-bind(tabWidth) + "px";
    height: 2px;
    background-color: skyblue;
    position: absolute;
    bottom: 0;
    left: 0;
    transition: transform 0.5s;
  }
}
</style>
