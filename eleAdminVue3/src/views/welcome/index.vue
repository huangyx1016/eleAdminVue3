<template>
  <!-- 这是欢迎页 -->
  <div>
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

    <div class="chart-box">
      <EchartView :option="charOption" />
    </div>
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

    <el-button type="primary" @click="toTransferPage">vue3路由跳转</el-button>
    <br />
    <!-- RouterLink标签跳转 可以query也可以params  -->
    <RouterLink class="link-href" :to="{ path: '/commonExample/transfer' }"
      >跳转transfer</RouterLink
    >
    <br />
    <RouterLink class="link-href" :to="{ name: 'transfer' }"
      >跳转transfer</RouterLink
    >
    <br />
    <!-- 带参数跳转 query -->
    <RouterLink
      class="link-href"
      :to="{ path: '/commonExample/transfer', query: { id: 1 } }"
      >query带参数跳转transfer</RouterLink
    >
    <br />
    <!-- 带参数跳转 params -->
    <!-- <RouterLink class="link-href" :to="{ name: 'transfer', params: { id: 1 } }"
      >params带参数跳转transfer</RouterLink
    > -->

    <el-row class="mb-4">
      <el-button>Default</el-button>
      <el-button type="primary">Primary</el-button>
      <el-button type="success">Success</el-button>
      <el-button type="info">Info</el-button>
      <el-button type="warning">Warning</el-button>
      <el-button type="danger">Danger</el-button>
    </el-row>

    <div style="margin-top: 40px">
      <p>{{ dateVal }}</p>
      <el-date-picker
        v-model="dateVal"
        type="datetime"
        value-format="YYYY-MM-DD HH:mm:ss"
        placeholder="Select date and time"
      />
    </div>
    <UploadImg />

    <el-check-tag :checked="tagChecked" @change="handleTagCheckedChange"
      >Toggle me</el-check-tag
    >
    <p>{{ curElTabIndex }}</p>
    <el-tabs
      v-model="curElTabIndex"
      :stretch="false"
      @tab-click="handleClickElTabIndex"
    >
      <el-tab-pane
        :label="tab"
        :name="i"
        v-for="(tab, i) in tabList"
        :key="i"
      ></el-tab-pane>
    </el-tabs>

    <el-button type="primary" @click="dialogVisible = true">
      点击打开弹窗
    </el-button>
    <el-dialog
      v-model="dialogVisible"
      title="提示"
      width="30%"
      class="dialog-box"
    >
      <span>This is a message</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="dialogVisible = false">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>

    <el-button @click="handleAdd">点击打开Dialog组件新增</el-button>
    <el-button @click="handleEdit">点击打开Dialog组件编辑</el-button>
    <Dialog
      v-model:show="modalData.showModal"
      :modal-data="modalData"
      :id="curId"
    />
    <el-button type="primary" @click="commonDialogVisible = true"
      >点击显示公共弹窗</el-button
    >
    <CommonDialog v-model:visible="commonDialogVisible" />
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, toRefs, toRef } from "vue";
import { useUserStore } from "@/stores/modules/user";
import { useRouter, RouterLink } from "vue-router";

import Tab from "@/components/common/Tab.vue";
import SlideTab from "@/components/common/SlideTab.vue";
import EchartView from "@/components/common/EchartView.vue";
import SelectOrgUserList from "@/components/common/SelectOrgUserList.vue";
import Pagination from "@/components/common/Pagination.vue";
import UploadImg from "@/components/common/UploadImg.vue";
import Dialog from "./Dailog.vue";
import CommonDialog from "@/components/common/CommonDialog.vue";
import { cloneDeep } from "lodash";
const curId = ref(0);
const modalData = ref({
  showModal: false,
  modalType: "",
  modalTitle: "",
  data: 0,
});
const handleAdd = () => {
  Object.assign(modalData.value, {
    showModal: true,
    modalType: "add",
    modalTitle: "新增",
    data: 0,
  });
  curId.value = 0;
};
const handleEdit = () => {
  Object.assign(modalData.value, {
    showModal: true,
    modalType: "edit",
    modalTitle: "编辑",
    data: 1,
  });
  curId.value = 1;
  // modalData.value = {
  //   showModal: true,
  //   modalType: "edit",
  //   modalTitle: "编辑",
  //   data: 1,
  // };
};

const commonDialogVisible = ref(false);
const userStore = useUserStore();
const router = useRouter();
const curSlideTab = ref(0);

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
    textStyle: {
      textBorderWidth: 2,
      textBorderColor: "red",
      color: "red",
    },
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

const dateVal = ref("");
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

const tagChecked = ref(false);
const curElTabIndex = ref(0);
const tabList = ref(["选项1", "选项2"]);
const dialogVisible = ref(false);
const handleClickElTabIndex = (tab) => {
  console.log("tab", tab);
};
const handleTagCheckedChange = (status: boolean) => {
  tagChecked.value = status;
  console.log("tagChecked", tagChecked.value);
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

//vue3中编程式路由跳转页面的方法  const router = useRouter();
const toTransferPage = () => {
  //router.push("/commonExample/transfer");
  //router.push({ path: "/commonExample/transfer", query: { id: 1 } }); //?id=1 带参数的query页面跳转,类似于get请求,参数会跟在url路径上
  router.push({ name: "transfer", params: { id: 1 } }); //params跳转页面 和query的区别：页面刷新query携带的值不会消失,params会消失,需要与name相配合
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

.link-href {
  text-decoration: none;
  margin-top: 20px;
  margin-bottom: 20px;
  box-sizing: border-box;
  color: #333;
}

:deep(.dialog-box) {
  height: 500px;
  .el-dialog__body {
    height: calc(100% - 176px);
  }
}
</style>
