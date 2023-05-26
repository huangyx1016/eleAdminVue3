<template>
  <!-- 后台管理系统 用户登录页面 -->
  <div class="login-container">
    <el-form
      :model="form"
      class="login-form"
      label-position="right"
      label-width="100px"
      :rules="rules"
      @submit.native.prevent
      ref="formRef"
    >
      <div class="title-container">{{ $t("login.title") }}</div>
      <el-form-item label="用户名：" prop="username">
        <el-icon class="left-icon" :size="20" color="white">
          <UserFilled />
        </el-icon>
        <!-- .trim 禁止输入空格 -->
        <el-input v-model.trim="form.username" clearable />
      </el-form-item>
      <el-form-item label="密码：" prop="password">
        <el-icon class="left-icon" :size="20" color="white">
          <Lock />
        </el-icon>
        <el-input
          v-model.trim="form.password"
          :type="passwordType"
          clearable
          show-password
        />
        <!-- <el-input v-model="form.password" :type="passwordType" clearable />
        <el-icon
          class="password-icon"
          :size="20"
          color="white"
          @click="changeType"
          :class="{ 'is-active': passwordType === 'text' }"
          v-show="form.password"
        >
          <View />
        </el-icon> -->
      </el-form-item>
      <el-button
        type="primary"
        class="loginBtn"
        :loading="loading"
        @click="handleLogin"
        @keyUp.enter="keyDownHandle"
        >{{ $t("login.btnTitle") }}</el-button
      >
      <!-- element-ui-plus 回车登录实现方式  核心是给el-form添加 @submit.native.prevent 以及将el-button添加native-type="submit" 
        参考网址：https://www.jianshu.com/p/f783c9742698 -->
      <!-- <el-button
        type="primary"
        class="loginBtn"
        :loading="userStore.loading"
        @click="handleLogin"
        native-type="submit"
        >{{ $t("login.btnTitle") }}</el-button
      > -->
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, onBeforeUnmount } from "vue";
import { ElMessage, type FormInstance, type FormRules } from "element-plus";

import { useUserStore } from "@/stores/modules/user";

const userStore = useUserStore();
const formRef = ref<FormInstance>(); //表单form ref实例
const loading = ref(false); //登录按钮loading
//登录表单对象值
const form = reactive({
  username: "admin",
  password: "admin",
});
//表单校验规则
const rules = reactive<FormRules>({
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { min: 5, max: 8, message: "长度在5到8之间", trigger: "blur" },
  ],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
});
const passwordType = ref("password"); //控制密码框输入显示或隐藏
//点击眼睛改变密码输入框input的type
const changeType = () => {
  if (passwordType.value === "password") {
    passwordType.value = "text";
  } else {
    passwordType.value = "password";
  }
};
//点击登录按钮 提交表单
const handleLogin = () => {
  //表单校验
  formRef.value?.validate((valid) => {
    if (valid) {
      loading.value = true;
      userStore
        .login(form)
        .then(() => {
          loading.value = false;
        })
        .catch((err) => {
          ElMessage.error(err);
          loading.value = false;
        }); //发起登录请求
    } else {
      return false;
    }
  });
};
//回车登陆
const keyDownHandle = (e) => {
  // console.log(e);
  if (e.key === "Enter") {
    //判断按下回车键 执行登录
    userStore.login(form);
  }
};
onMounted(() => {
  /*
   * onMounted生命周期全局绑定事件
   * addEventListener(event,function,useCapture);
   * 第一个参数event：指事件的类型（如’click’,‘mousedown’）
   * 第二个参数function：事件触发后调用的函数
   *第三个参数useCapture：设置传递的类型，默认值为false，即冒泡传递（可省略）；值为true时，捕获传递。
   */
  window.addEventListener("keydown", keyDownHandle);
});
onBeforeUnmount(() => {
  //在销毁前移除全局事件
  window.removeEventListener("keydown", keyDownHandle, false);
});
</script>

<style lang="scss" scoped>
.login-container {
  width: 100%;
  height: 100%;
  background-color: #2d3a4b;
  .is-active {
    color: skyblue;
  }
  .login-form {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
    .title-container {
      text-align: center;
      font-size: 30px;
      color: whitesmoke;
      margin-bottom: 50px;
    }
    ::v-deep(.el-form-item) {
      margin-bottom: 30px;
      .el-form-item__label {
        font-size: 18px;
        color: whitesmoke;
      }
      .el-form-item__content {
        width: 400px;
        position: relative;
        .left-icon {
          position: absolute;
          left: 10px;
          top: 50%;
          transform: translate(0, -50%);
          z-index: 10;
        }
        .password-icon {
          position: absolute;
          right: 30px;
          top: 50%;
          transform: translate(0, -50%);
          z-index: 10;
          cursor: pointer;
          &:hover {
            color: skyblue;
          }
        }
        .el-input {
          border: 1px solid rgba(255, 255, 255, 0.1);
          .el-input__wrapper {
            background: transparent;
            --el-input-border-color: rgba(255, 255, 255, 0.1);
            .el-input__inner {
              padding-left: 20px;
              font-size: 18px;
              color: white;
            }
          }
        }
      }
    }
    .loginBtn {
      width: 100%;
    }
  }
}
</style>
