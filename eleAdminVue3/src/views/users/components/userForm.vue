<template>
  <!-- 新增/编辑用户表单 -->
  <el-form
    ref="formRef"
    :model="form"
    :rules="rules"
    label-width="120px"
    class="demo-ruleForm"
    status-icon
  >
    <el-form-item label="用户名" prop="username">
      <el-input v-model="form.username" clearable />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input type="password" v-model="form.password" clearable />
    </el-form-item>
    <el-form-item label="确认密码" prop="rePassword">
      <el-input type="password" v-model="form.rePassword" clearable />
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="form.email" clearable />
    </el-form-item>
    <el-form-item label="手机号" prop="mobile">
      <el-input v-model="form.mobile" clearable />
    </el-form-item>
    <!-- <el-form-item label="头像" prop="userHead"></el-form-item> -->
  </el-form>
</template>

<script lang="ts" setup>
import { ref, reactive, nextTick, onUnmounted } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { ElMessage } from "element-plus";
import { getUserById } from "@/api/user";
const formRef = ref();
//用户信息表单
let form = ref({
  username: "", //用户名
  password: "", //密码
  rePassword: "", //重复密码
  email: "", //邮件
  mobile: "", //电话号码
});

//来自父组件传递的参数
const props = defineProps({
  //用户id
  id: {
    type: Number,
    default: null,
  },
});

/**
 * @method getUserByIdHandle
 * @description 根据用户id获取用户详情信息接口方法
 * @param id 用户id
 */
const getUserByIdHandle = async (id: number) => {
  let res: any = await getUserById(id);
  //console.log("res", res);
  if (res.meta.status === 200 && res.data) {
    form.value = res.data; //赋值数据用于回显    这里如果使用的是reactive定义的数据可以通过form.属性名来赋值,才不会有失去响应式的问题。
  }
};
console.log("props.id", props.id);
//如果id存在就根据id查询用户信息 回显数据
if (props.id) {
  getUserByIdHandle(props.id);
}

/**
 * 提交表单 进行表单效验
 * @param callback : fn 参数是一个 回调函数
 */
const submitForm = (callback) => {
  if (!formRef) return; //判断表单ref是否存在
  formRef.value?.validate((valid) => {
    if (valid) {
      callback(form.value); //效验通过调用回调函数将用户表单数据传回父组件
    } else {
      ElMessage.error("效验失败"); // 效验失败进行提示
      return false;
    }
  });
};

//重置表单项的方法  重置表单效验以及表单的初始值
const resetForm = () => {
  //nextTick(()=>{}) 等待下一次 DOM 更新刷新。
  //重置该表单项，将其值重置为初始值，并移除校验结果
  formRef.value.resetFields(); //表单的方法resetFields()
  nextTick(() => {
    //重置该表单项，将其值重置为初始值
    form.value = {
      username: "",
      password: "",
      rePassword: "",
      email: "",
      mobile: "",
    };
  });
};

//自定义校验密码  与naive-ui不同的是element-plus有个callback回调函数， 提示信息使用的是callback(new Error("请输入密码")); naive-ui使用的是return new Error();
const validatePass = (rule: any, value: any, callback: any) => {
  // console.log("rule", rule);
  // console.log("rule.pattern", rule.pattern);
  // console.log("pattern", Object.prototype.toString.call(rule.pattern));
  // console.log("pattern", rule.pattern.test(value));
  if (!value) {
    //当值为空时的判断
    callback(new Error("请输入密码"));
  } else {
    //值不为空的时候  正则表达式.test(value); 返回boolean值
    if (!rule.pattern.test(value)) {
      //不符合正则表达式的时候
      callback(
        new Error(
          "密码必须包含大小写字母、数字、特殊符号中至少3种,并且长度不小于6"
        )
      );
    } else if (form.value.rePassword !== "") {
      if (!formRef.value) return;
      //验证表单的重复密码字段
      formRef.value.validateField("rePassword", () => null); //validateField(); 验证表单具体某个字段
    }
    callback();
  }
};
//自定义效验重复密码|再次输入密码
const validateRePass = (rule: any, value: any, callback: any) => {
  if (!value) {
    callback(new Error("请再次输入密码")); //再次输入密码空值提示
  } else if (value !== form.value.password) {
    callback(new Error("两次输入密码不一致")); //再次输入密码和密码不一致,两次密码输入不一致
  } else {
    callback();
  }
};

//自定义效验手机号码
const validateMobile = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请输入手机号码")); //非空判断
  } else {
    if (!rule.pattern.test(value)) {
      callback(new Error("手机号码格式不正确")); //正则规则效验
    }
  }
};

//自定义效验邮箱
const validateEmail = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请输入邮箱"));
  } else {
    if (!rule.pattern.test(value)) {
      callback(new Error("请输入合法的邮箱"));
    }
  }
};

//表单效验规则
const rules = reactive<FormRules>({
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    {
      min: 5, //最小长度
      max: 10, //最大长度
      message: "用户名长度在5到10个字符",
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      validator: validatePass,
      trigger: "blur",
      pattern:
        /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_]+$)(?![a-z0-9]+$)(?![a-z\W_]+$)(?![0-9\W_]+$)[a-zA-Z0-9\W_]{6,16}$/,
      //正则表达式检验密码必须包含大小写字母、数字、特殊字符中至少3中  并且位数不小于6
    },
  ],
  rePassword: [{ required: true, validator: validateRePass, trigger: "blur" }],
  email: [
    {
      required: true,
      validator: validateEmail,
      trigger: "blur",
      pattern: /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/,
    },
  ],
  mobile: [
    {
      required: true, //是否必须
      validator: validateMobile,
      pattern: /(^((\+86)|(86))?(1[3-9])\d{9}$)|(^(0\d{2,3})-?(\d{7,8})$)/, //pattern:正则表达式
      trigger: ["blur", "change"], //触发方式
    },
  ],
});

//使用defineExpose抛出submitForm方法供父组件调用
defineExpose({
  submitForm, //提交表单
  resetForm, //重置表单
});

onUnmounted(() => {
  console.log("销毁");
});
</script>

<style lang="scss" scoped></style>
