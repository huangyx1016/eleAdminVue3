<template>
  <!-- 用户管理 用户列表页面 -->
  <el-card>
    <!-- gutter 每个栅格之间的间隔 -->
    <el-row align="middle" :gutter="20" class="header-tools">
      <!-- span 栅格占据的列数   总共可以分为24个栅格 -->
      <el-col :span="2">用户名:</el-col>
      <el-col :span="6">
        <!-- <el-input
          placeholder="请输入用户名"
          clearable
          v-model="searchVal"
          @keyup.enter="handleSearch"
          @clear="handleSearch"
          @input="inputHandle"
        ></el-input> -->
        <SearchInput
          v-model:searchValue="searchVal"
          placeholder="请输入用户名"
          @search="handleSearch"
          @change-input="handleSearch"
          :loading="searchLoading"
        />
      </el-col>
      <el-button
        type="primary"
        :icon="Search"
        @click="handleSearch"
      ></el-button>
      <el-button type="primary" @click="handleAdd" :icon="Plus">新增</el-button>
      <el-button type="danger" @click="handleBatchDelete" :icon="Delete"
        >删除</el-button
      >
      <el-button type="success" @click="handleImportFile" :icon="Bottom"
        >导入</el-button
      >
      <el-button type="success" @click="handleExportExcel" :icon="Top"
        >导出</el-button
      >

      <el-button type="success" @click="handleImportXlsxFile" :icon="Bottom"
        >前端excel表格数据导入</el-button
      >
      <el-button type="success" @click="handleExportProcess" :icon="Top"
        >前端json数据导出</el-button
      >
    </el-row>
    <el-table
      v-loading="tableLoading"
      :data="tableData"
      :row-key="rowKey"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <!--  reserve-selection：数据刷新后是否保留选项  需要指定row-key来让这个功能生效  -->
      <el-table-column
        v-for="(item, index) in columns"
        :key="index"
        :label="item.label"
        :prop="item.prop"
        :width="item.width"
        :fixed="item.fixed"
        :type="item.type"
        :align="item.align"
        reserve-selection
      >
        <!-- 序号列 -->
        <template #default="scope" v-if="item.prop === 'no'">
          {{
            pageInfo.pageSize * (pageInfo.currentPage - 1) + (scope.$index + 1)
          }}
        </template>
        <!-- 使用开关组件显示表格列数据 -->
        <template #default="scope" v-if="item.prop === 'mg_state'">
          <el-switch v-model="scope.row.mg_state" />
        </template>
        <template #default="scope" v-else-if="item.prop === 'create_time'">
          {{ $transformDateByMoment(scope.row.create_time, 1000) }}
        </template>
        <!-- 表格操作列 根据prop名称判断来控制其显示  这里给按钮添加图标使用:icon 需要引入才能使用-->
        <template #default="scope" v-else-if="item.prop === 'action'">
          <el-button
            type="default"
            size="small"
            title="详情"
            @click="handleDetail(scope.$index, scope.row)"
            :icon="Setting"
            >详情</el-button
          >
          <el-button
            type="primary"
            size="small"
            title="编辑"
            :icon="Edit"
            @click="handleEdit(scope.row)"
            >编辑</el-button
          >
          <el-button
            type="danger"
            size="small"
            title="删除"
            :icon="Delete"
            @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <Pagination
      :currentPage="pageInfo.currentPage"
      :page-size="pageInfo.pageSize"
      :total="pageInfo.total"
      :layout="pageInfo.layout"
      :background="pageInfo.background"
      singleHide
      @change="handleCurrentChange"
      @change-size="handleSizeChange"
    />
    <!-- el-drawer 抽屉组件  el-drawer加上v-if 解决drawer组件内的子组件中的接口只调用一次的问题 -->
    <el-drawer
      v-model="modalData.showDrawer"
      v-if="modalData.showDrawer"
      direction="rtl"
      :title="modalData.modalTitle"
      :close-on-click-modal="isShowDetail"
    >
      <!-- <template #header>
        <h4>标题</h4>
      </template> -->
      <template #default>
        <userDetail v-if="isShowDetail" :id="modalData.data" />
        <userForm v-else ref="userFormRef" :id="modalData.data" />
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="cancelClick">取消</el-button>
          <el-button type="primary" @click="confirmClick">确定</el-button>
        </div>
      </template>
    </el-drawer>

    <el-dialog v-model="importDialogVisible" title="导入文件" width="30%">
      <el-row justify="center">
        <el-upload
          ref="uploadRef"
          class="upload-demo"
          action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
          :auto-upload="false"
          accept=".xls,.xlsx"
          :on-change="handleUploadChange"
        >
          <template #trigger>
            <el-button type="primary">选择文件</el-button>
          </template>
          <template #tip>
            <div class="el-upload__tip">只能上传xls文件,且不超过500kb</div>
          </template>
        </el-upload>
      </el-row>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="importDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="confirmUploadFile">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </el-card>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed, watch, getCurrentInstance } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import type { UploadInstance } from "element-plus";
import * as XLSX from "xlsx";
import {
  Search,
  Setting,
  Edit,
  Delete,
  Plus,
  Bottom,
  Top,
} from "@element-plus/icons-vue";
import {
  getUserPageList,
  addUser,
  deleteUserById,
  updateUserById,
} from "@/api/user";
import { columns } from "./columns"; //表头数据
import Pagination from "@/components/common/Pagination.vue";
import userDetail from "./components/userDetail.vue";
import userForm from "./components/userForm.vue";
import type { BasicModalData } from "./type";
import SearchInput from "@/components/common/Search.vue";
// import { transformDate } from "@/utils/getNowFormatTime";

const tableData = ref([]); //表格数据
const tableLoading = ref(false); //tableLoading 表格loading
const searchVal = ref(""); //搜索关键字
const searchLoading = ref(false); //搜索组件loading
const timer = ref(null);
const multipleSelection = ref([]); //多选id数组
const multipleSelectionAll = ref([]); //多选的表格所有项数据
const userFormRef = ref(); //用户表单组件ref
const importDialogVisible = ref(false); //控制文件导入对话框的显示/隐藏
const uploadRef = ref<UploadInstance>(); //文件上传ref
const { proxy } = getCurrentInstance() as any; //获取当前实例

const pageInfo = ref({
  currentPage: 1,
  pageSize: 5,
  background: true,
  layout: "prev, pager, next, jumper,total, sizes",
  total: 0,
});
const modalData = ref<BasicModalData<number>>({
  showDrawer: false, //显示/隐藏抽屉组件
  modalType: "", //抽屉是进行新增|编辑|删除|详情操作
  modalTitle: "", //抽屉组件的标题
  data: 0,
  width: 500, //抽屉窗体宽度大小
});

//:row-key="rowKey" 行数据的 Key，用来优化 Table 的渲染；
const rowKey = (row) => {
  return row.id;
};
//点击drawer下方取消按钮
const cancelClick = () => {
  modalData.value.showDrawer = false; //关闭弹窗
};
//点击drawer下方确定按钮保存用户信息
const confirmClick = () => {
  //父组件调用子组件里的submitForm方法
  userFormRef.value.submitForm((val) => {
    //判断当前是新增或者修改
    if (modalData.value.modalType === "add") {
      let params = {
        username: val.username,
        password: val.password,
        email: val.email,
        mobile: val.mobile,
      };
      addUserHandle(params); //添加用户
    } else if (modalData.value.modalType === "edit") {
      console.log("val", val);
      //根据id更新用户信息
      //updateUserByIdHandle(val);
    }
  });
};

/**
 * 每页条数改变的回调
 * @param val 每页条数
 */
const handleSizeChange = (val: number) => {
  pageInfo.value.pageSize = val;
  //重新加载表格数据
  let params = {
    query: searchVal.value,
    pagenum: pageInfo.value.currentPage,
    pagesize: pageInfo.value.pageSize,
  };
  getUserPageListData(params);
};
/**
 * 当前页码改变的回调
 * @param val 当前页码
 */
const handleCurrentChange = (val: number) => {
  pageInfo.value.currentPage = val;
  //重新加载表格数据
  let params = {
    query: searchVal.value,
    pagenum: pageInfo.value.currentPage,
    pagesize: pageInfo.value.pageSize,
  };
  getUserPageListData(params);
};
/**
 * 防抖
 * @param fn 方法
 * @param delay 时间
 */
const debounce = (fn, delay) => {
  if (timer.value) {
    clearTimeout(timer.value);
  }
  timer.value = setTimeout(fn, delay);
};
// @input="inputHandle"
const inputHandle = () => {
  debounce(handleSearch, 1000);
};
/**
 * 点击搜索按钮或者回车搜索用户列表
 */
const handleSearch = () => {
  searchLoading.value = true; //开启加载动画 这里由于搜索和分页用的是同一个接口所以不能把开启加载动画的代码放在接口请求里
  //判断如果搜索框有值  根据搜索关键词获取分页表格数据
  let params = {
    query: searchVal.value,
    pagenum: pageInfo.value.currentPage,
    pagesize: pageInfo.value.pageSize,
  };
  getUserPageListData(params);
  // if (searchVal.value) {
  //   let params = {
  //     query: searchVal.value,
  //     pagenum: pageInfo.value.currentPage,
  //     pagesize: pageInfo.value.pageSize,
  //   };
  //   getUserPageListData(params);
  // } else {
  //   //搜索所有表格分页数据
  //   let params = {
  //     query: "",
  //     pagenum: pageInfo.value.currentPage,
  //     pagesize: pageInfo.value.pageSize,
  //   };
  //   getUserPageListData(params);
  // }
};
/**
 * 接口获取用户列表数据| 包含根据用户名查询
 * @param params {query:""搜索条件,pagenum:""页码,pagesize:""每页条数}
 */
const getUserPageListData = async (params) => {
  tableLoading.value = true; //开启表格加载动画
  const res: any = await getUserPageList(params).catch((err) => {
    searchLoading.value = false; //关闭搜索框加载动画
    tableLoading.value = false; //关闭表格加载动画
  });
  if (res.meta.status === 200 && res.data.users) {
    tableData.value = res.data.users; //赋值表格数据
    pageInfo.value.total = res.data.total; //赋值数据总条数
  }
  searchLoading.value = false; //关闭搜索框加载动画
  tableLoading.value = false; //关闭表格加载动画
};

/**
 * @description 添加用户接口方法
 * @param params 用户表单数据
 */
const addUserHandle = async (params) => {
  let res: any = await addUser(params);
  if (res.meta.status === 200 || (res.meta.status === 201 && res.data)) {
    modalData.value.showDrawer = false; //关闭抽屉组件
    pageInfo.value.currentPage = 1; //页码切回第一页
    let params = {
      query: searchVal.value,
      pagenum: pageInfo.value.currentPage,
      pagesize: pageInfo.value.pageSize,
    };
    getUserPageListData(params); //重新加载表格数据
    ElMessage.success(res.meta.msg); //显示提示信息
  }
};

/**
 * @description 根据id删除单个用户
 * @param id 用户id
 */
const deleteUserByIdHandle = async (id) => {
  let res: any = await deleteUserById(id);
  if (res.meta.status === 200 || res.meta.status === 201) {
    modalData.value.showDrawer = false; //关闭抽屉组件
    checkTableList(1); //页码处理，看是否删除的是当前页最后一条
    let params = {
      query: searchVal.value,
      pagenum: pageInfo.value.currentPage,
      pagesize: pageInfo.value.pageSize,
    };
    getUserPageListData(params); //重新加载表格数据
    ElMessage.success(res.meta.msg); //显示提示信息
  }
};
/**
 * 根据id修改用户信息
 * @param params 用户表单信息
 */
const updateUserByIdHandle = async (params) => {
  let res: any = await updateUserById(params);
  if (res.meta.status === 200 || res.meta.status === 201) {
    modalData.value.showDrawer = false; //关闭抽屉组件
    pageInfo.value.currentPage = 1; //页码切回第一页
    let params = {
      query: searchVal.value,
      pagenum: pageInfo.value.currentPage,
      pagesize: pageInfo.value.pageSize,
    };
    getUserPageListData(params); //重新加载表格数据
    ElMessage.success(res.meta.msg);
  }
};
//点击新增按钮
const handleAdd = () => {
  Object.assign(modalData.value, {
    showDrawer: true, //显示/隐藏抽屉组件
    modalType: "add", //抽屉是进行新增|编辑|删除|详情操作
    modalTitle: "新增用户", //抽屉组件的标题
    data: null,
  });
};
//点击详情按钮
const handleDetail = (index, row) => {
  Object.assign(modalData.value, {
    showDrawer: true,
    modalType: "detail",
    modalTitle: "用户详情",
    data: row.id,
  });
};
//点击编辑按钮
const handleEdit = (row) => {
  Object.assign(modalData.value, {
    showDrawer: true,
    modalType: "edit",
    modalTitle: "编辑用户",
    data: row.id,
  });
};
//点击表格右侧按钮  根据id删除
const handleDelete = (row) => {
  //提示确认删除嘛
  ElMessageBox.confirm(`确定要删除${row.username}吗?`, "警告", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      //点击确定按钮调用接口根据id删除用户
      deleteUserByIdHandle(row.id);
    })
    .catch(() => {
      return;
    });
};
//点击删除按钮 根据id数组批量删除
const handleBatchDelete = () => {
  //如果没有选中多选 提示
  if (!multipleSelection.value.length) {
    ElMessage.warning("请选择需要删除的数据");
    return;
  }
  //调用接口批量删除数据
  ElMessageBox.confirm(`确定要删除所选的数据吗?`, "警告", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      //调用接口根据id批量删除用户
    })
    .catch(() => {
      return;
    });
};

/**
 * 表格多选的回调函数
 * @param val 多选的表格行数据数组
 */
const handleSelectionChange = (val) => {
  console.log("val", JSON.parse(JSON.stringify(val)));
  multipleSelection.value = []; //清空数组,防止选择后取消再选择重复添加id的问题
  multipleSelectionAll.value = val;
  //循环添加多选的id数组
  val.forEach((item) => {
    multipleSelection.value.push(item.id);
  });
  // console.log(
  //   "multipleSelection",
  //   JSON.parse(JSON.stringify(multipleSelection.value))
  // );
  // console.log(
  //   "multipleSelectionAll",
  //   JSON.parse(JSON.stringify(multipleSelectionAll.value))
  // );
};

// 删除后，重新获取页面数据，判断列表的条数是不是没了，没了页码往前推一页，直到是第一页为止
const checkTableList = (listNum) => {
  // listNum 一次性删除的条数
  if (tableData.value.length === listNum && pageInfo.value.currentPage > 1) {
    pageInfo.value.currentPage -= 1;
  }
};

//isShowDetail 控制详情面板显示/隐藏
const isShowDetail = computed(() => {
  return modalData.value.modalType === "detail";
});

//重置子组件表单表单项以及初始值
const resetUserForm = () => {
  //调用子组件中暴露出来的resetForm()方法重置表单项和表单初始值
  userFormRef.value.resetForm();
};

//监听 这是使用监听去重置表单效验和表单初始值
// watch(
//   () => modalData.value.showDrawer,
//   (val) => {
//     if (!val) {
//       resetUserForm();
//     }
//   }
// );

//文件导入
const handleImportFile = () => {
  console.log("文件导入");
  importDialogVisible.value = true;
};

//文件导出 相当于下载功能
const handleExportExcel = async () => {
  console.log("文件导出");
  if (multipleSelection.value.length) {
    let resp = await exportExcel(multipleSelection.value).catch((err) => {
      console.log(err);
    });
    if (resp.data) {
      let filename = resp.headers["content-disposition"].split(";")[1];
      filename = filename.split("=")[1];
      console.log("filename", filename); //文件名
      if (filename) {
        filename = decodeURIComponent(filename);
      }
      let blob = new Blob([resp.data], {
        type: "application/vnd.ms-excel,charset=UTF-8",
      }); //使用blob下载
      var url = window.URL.createObjectURL(blob);
      var a = document.createElement("a");
      a.href = url;
      a.download = filename || `用户列表.xlsx`;
      a.click();
    }
  } else {
    ElMessage.warning("请选择用户列表数据进行导出");
  }
};

//点击dialog确定上传文件
const confirmUploadFile = () => {
  uploadRef.value!.submit(); //这里是手动上传 因为设置了:auto-upload="false" 取消了上传完毕后就上传
};

//文件上传 on-change回调:文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
const handleUploadChange = (e: any) => {
  console.log(e);
  const file = e.raw;
  const reader = new FileReader(); //new FileReader() js文件信息读取
  reader.readAsArrayBuffer(file); //readAsArrayBuffer(file) 读取文件或Blob作为数组缓冲区。 一种用例是将大文件发送给服务人员。,常用于分片传输
  reader.onload = (ev) => {
    console.log("ev", ev);
    let data = ev.target.result;
    const workbook = XLSX.read(data, { type: "binary", cellDates: true });
    const wsname = workbook.SheetNames[0];
    const getData = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]); //XLSX.utils.sheet_to_json(worksheet, opts) 从工作表创建js对象数组
    console.log(getData); //获取的excel文件json数据
  };
};

//纯前端excel表格数据导入  这里使用xlsx结合element-plus 文件上传实现  xlsx文档:
const handleImportXlsxFile = () => {
  console.log("前端excel表格数据导入");
  importDialogVisible.value = true; //显示文件上传弹窗
};
//纯前端json数据导出  这里使用的是XLSX插件   npm install xlsx --save  简单使用：https://blog.csdn.net/wzyleix97/article/details/127410799
const handleExportProcess = () => {
  console.log("前端json数据导出");
  if (multipleSelectionAll.value.length) {
    let exportData = [];
    //导出数据结构构造 遍历multipleSelectionAll
    multipleSelectionAll.value.forEach((item) => {
      exportData.push({
        id: item.id,
        username: item.username ? item.username : "",
        mobile: item.mobile ? item.mobile : "",
        email: item.email ? item.email : "",
        role_name: item.role_name ? item.role_name : "",
        mg_state: item.mg_state ? "已启动" : "已禁用", //根据item值显示不同的内容
        create_time: item.create_time
          ? proxy.$transformDateByMoment(item.create_time, 1000)
          : "", //script里面要使用全局挂载的方法必须先获取实例再调用
      });
    });
    //导出表头设计  导出的excel文件的表头head
    let head = {
      id: "id",
      username: "用户名",
      mobile: "电话号码",
      email: "邮箱",
      role_name: "角色",
      mg_state: "状态",
      create_time: "创建时间",
    };
    //表头数据切换
    const list = exportData.map((item) => {
      const obj = {};
      for (const k in item) {
        if (head[k]) {
          obj[head[k]] = item[k];
        }
      }
      return obj;
    }); //返回一个处理好的对象数组
    // 创建/生成工作表
    const data = XLSX.utils.json_to_sheet(list);
    // 创建工作簿
    const wb = XLSX.utils.book_new();
    // 将工作表放入工作簿中
    XLSX.utils.book_append_sheet(wb, data, "data");
    // 生成文件并下载
    XLSX.writeFile(wb, "用户列表.xlsx");
  } else {
    ElMessage.warning("请选择用户数据进行导出");
  }
};
onMounted(() => {
  //页面加载完成发送请求获取用户列表列表分页数据
  let params = {
    query: searchVal.value,
    pagenum: pageInfo.value.currentPage,
    pagesize: pageInfo.value.pageSize,
  };
  getUserPageListData(params);
});
</script>

<style lang="scss" scoped>
.header-tools {
  padding-bottom: 20px;
  box-sizing: border-box;
}
</style>
