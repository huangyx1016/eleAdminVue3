<template>
  <!-- <el-row :gutter="10">
    <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
      <div class="grid-content ep-bg-purple"></div>
    </el-col>
    <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
      <div class="grid-content ep-bg-purple-light">
        <p class="hidden-xs-only">xs时隐藏</p>
      </div>
    </el-col>
    <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
      <div class="grid-content ep-bg-purple"></div>
    </el-col>
    <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
      <div class="grid-content ep-bg-purple-light"></div>
    </el-col>
  </el-row> -->

  <div>
    <p>使用checkbox实现单选效果{{ curSelItem }}</p>
    <el-checkbox-group v-model="curSelItem" @change="handleCheckedChange">
      <el-checkbox
        v-for="(item, index) in listData"
        :key="item.id"
        :label="item.id"
        >{{ item.name }}</el-checkbox
      >
    </el-checkbox-group>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
const curSelItem = ref<number[]>([]); //checkbox-group 绑定的值
const prevSelItem = ref(); //前一个选择的id
const listData = ref([
  { id: 1, name: "语文" },
  { id: 2, name: "数学" },
  { id: 3, name: "英语" },
]);
// if (listData.value.length) {
//   curSelItem.value = [listData.value[0].id];
// }
const handleCheckedChange = (value: string[] | number[]) => {
  console.log("value", value);
  const list = [...value] as number[];
  console.log("list", list);
  const len = list.length;
  const newItem = list[len - 1]; //获取数组最后一位的数据
  // console.log("newItem", newItem);
  if (newItem) {
    curSelItem.value = [newItem];
    prevSelItem.value = newItem;
  } else {
    curSelItem.value = [prevSelItem.value];
  }
};
</script>

<style lang="scss" scoped>
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.ep-bg-purple {
  background-color: powderblue;
}
.ep-bg-purple-light {
  background-color: plum;
}
</style>
