<template>
  <!-- 这是头部组件 -->
  <el-header class="nav-bar">
    <CollapseIcon />
    <BreadCrumb class="bread-crumb" />

    <div class="right-content">
      <div class="full-screen">
        <fullScreen />
      </div>
      <Clock />

      <div class="change-lang">
        <ChangeLang />
      </div>

      <ChangeTheme />

      <el-dropdown>
        <div class="login-user-box pointer">
          <el-avatar shape="square" :size="40" :src="userHeadSrc" />
          <span class="login-user-txt">{{ userStore.userInfo.username }}</span>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>
              <el-button type="default" @click="logout">注销</el-button>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useUserStore } from "@/stores/modules/user";
import { ElMessageBox } from "element-plus";
import CollapseIcon from "./components/CollapseIcon.vue"; //折叠菜单图标组件
import Clock from "./components/Clock.vue"; //当前系统时间组件
import BreadCrumb from "./components/BreadCrumb.vue"; //面包屑组件
import ChangeLang from "@/components/ChangeLang.vue"; //切换语言组件
import fullScreen from "./components/fullScreen.vue"; //全屏组件
import ChangeTheme from "@/components/ChangeTheme.vue";

const userStore = useUserStore();
const userHeadSrc = ref(
  "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
); //默认用户头像

//点击注销按钮   退出登录
const logout = () => {
  ElMessageBox.confirm("确认退出吗?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      userStore.loginOut(); //调用store里面的退出登录的方法
    })
    .catch(() => {
      return;
    });
};
</script>

<style lang="scss" scoped>
.nav-bar {
  width: 100%;
  height: 60px;
  display: flex;
  padding: 0;
  align-items: center;
  box-sizing: border-box;
  .collapse-icon {
    cursor: pointer;
  }
  .bread-crumb {
    margin-left: 20px;
  }
  .right-content {
    margin-left: auto;
    display: flex;
    gap: 10px;
    align-items: center;
    ::v-deep(.el-dropdown-menu__item) {
      padding: 5px;
    }
    .change-lang {
      // margin-right: 10px;
      .el-dropdown-link {
        cursor: pointer;
        color: #409eff;
        display: flex;
        align-items: center;
      }
    }
    .full-screen {
      // margin-left: 10px;
    }

    .login-user-box {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;
      .login-user-txt {
        font-size: 18px;
        color: var(--default-txt-color);
        // margin-left: 10px;
      }
    }
  }
}
</style>
