<template>
  <!-- 这是欢迎页 -->
  <div style="height: 300px; overflow: auto">
    <p>{{ $t("message.welcome") }}</p>
    <p>{{ userStore.userInfo.username }}</p>
    <p>{{ $t("message.username") }}</p>
    <!-- <div style="margin: 20px">
      <Tab @change="handleTabChange"/>
    </div> -->
    <!-- <div style="margin: 20px">
      <SlideTab
        :tab-width="120"
        @change="handleSlideTabChange"
        v-model="curSlideTab"
      />
    </div> -->

    <div style="margin: 20px; box-sizing: border-box">
      <SelectOrgUserList
        :options="options"
        v-model="selected"
        @change="handleSelectOrgUSerChange"
      />
      <p>当前选中的值:{{ selected }}</p>
    </div>

    <!-- <div class="chart-box">
      <EchartView :option="charOption" />
    </div> -->
    <!-- <p>{{ state }}</p>
    <button @click="changeState">点击修改</button>
    <div class="parent-box">
      <div class="child-box" v-drag></div>
    </div> -->

    <el-checkbox
      v-model="checkAll"
      :indeterminate="isIndeterminate"
      @change="handleCheckAllChange"
      >Check all</el-checkbox
    >
    <el-checkbox-group
      v-model="checkedCities"
      @change="handleCheckedCitiesChange"
    >
      <el-checkbox v-for="city in cities" :key="city" :label="city">{{
        city
      }}</el-checkbox>
    </el-checkbox-group>

    <Pagination
      :currentPage="pageInfo.currentPage"
      :page-size="pageInfo.pageSize"
      :total="pageInfo.total"
      :layout="pageInfo.layout"
      :background="pageInfo.background"
      :singleHide="true"
    />

    <el-tree
      :data="treeData"
      :props="defaultProps"
      @node-click="handleNodeClick"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, toRefs } from "vue";
import { useUserStore } from "@/stores/user";
import Tab from "@/components/common/Tab.vue";
import SlideTab from "@/components/common/SlideTab.vue";
import EchartView from "@/components/common/EchartView.vue";
import SelectOrgUserList from "@/components/common/SelectOrgUserList.vue";
import Pagination from "@/components/common/Pagination.vue";
const userStore = useUserStore();
const curSlideTab = ref(1);

const checkAll = ref(false);
const isIndeterminate = ref(true);
const checkedCities = ref(["Shanghai", "Beijing"]);
const cities = ["Shanghai", "Beijing", "Guangzhou", "Shenzhen"];

type optionsType = {
  label: string;
  value: number;
  checked: boolean;
};
const options = ref<optionsType[]>([
  { value: 1, label: "选项1", checked: false },
  { value: 2, label: "选项2", checked: false },
  { value: 3, label: "选项3", checked: false },
]);
const selected = ref([]);
const charOption = reactive({
  title: {
    text: "ECharts 入门示例",
  },
  tooltip: {},
  xAxis: {
    data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
  },
  yAxis: {},
  series: [
    {
      name: "销量",
      type: "bar",
      data: [5, 20, 36, 10, 10, 20],
    },
  ],
});

let state = reactive({
  id: 1,
  name: "zhangsan",
  // job: {
  //   enterTime: "2023-03-27",
  //   salary: "700",
  // },
});

const pageInfo = ref({
  currentPage: 1,
  pageSize: 5,
  background: true,
  layout: "total, sizes, prev, pager, next, jumper",
  total: 10,
});

interface Tree {
  label: string;
  children?: Tree[];
}
const treeData = ref<Tree[]>([
  {
    label: "Level one 1",
    children: [
      {
        label: "Level two 1-1",
        children: [
          {
            label: "Level three 1-1-1",
          },
        ],
      },
    ],
  },
  {
    label: "Level one 2",
    children: [
      {
        label: "Level two 2-1",
        children: [
          {
            label: "Level three 2-1-1",
          },
        ],
      },
      {
        label: "Level two 2-2",
        children: [
          {
            label: "Level three 2-2-1",
          },
        ],
      },
    ],
  },
  {
    label: "Level one 3",
    children: [
      {
        label: "Level two 3-1",
        children: [
          {
            label: "Level three 3-1-1",
          },
        ],
      },
      {
        label: "Level two 3-2",
        children: [
          {
            label: "Level three 3-2-1",
          },
        ],
      },
    ],
  },
]);

const defaultProps = {
  children: "children",
  label: "label",
};

const handleNodeClick = (data: Tree) => {
  console.log(data);
};

const changeState = () => {
  state = { id: 2, name: "lisi" };
};

//tab切换的回调
const handleTabChange = (data) => {
  console.log("data", data);
};

/**
 * slideTab切换的回调
 * @param data
 */
const handleSlideTabChange = (data) => {
  // console.log("data", data);
  console.log("curSlideTab", curSlideTab.value); //这里绑定了v-model
};

const handleCheckAllChange = (val: boolean) => {
  checkedCities.value = val ? cities : [];
  isIndeterminate.value = false;
};
const handleCheckedCitiesChange = (value: string[]) => {
  console.log("value", value);
  const checkedCount = value.length;
  checkAll.value = checkedCount === cities.length;
  isIndeterminate.value = checkedCount > 0 && checkedCount < cities.length; //indeterminate 设置不确定状态
};

//组件值改变的回调
const handleSelectOrgUSerChange = (val) => {
  console.log("handleSelectOrgUSerChange", JSON.parse(JSON.stringify(val)));
};
</script>

<style lang="scss" scoped>
.parent-box {
  width: 100%;
  height: 400px;
  box-sizing: border-box;
  border: 1px solid black;
  .child-box {
    width: 100px;
    height: 100px;
    border: 1px solid skyblue;
    box-sizing: border-box;
  }
}
.chart-box {
  width: 500px;
  height: 300px;
}
</style>
