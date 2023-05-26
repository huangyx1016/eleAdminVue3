//简单的axios请求封装 vue2的写法
import axios from "axios";
import { ElMessage, ElLoading } from "element-plus";
import { diffTokenTime } from "@/utils/auth";
import { useUserStore } from "@/stores/modules/user";
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, //开发环境api
  timeout: 5000, //请求超时时间
});

//console.log("baseURL", process.env.VUE_APP_BASE_API); //vite项目需要在vite.config.ts里面配置
let loadingInstance;
let userStore;
// 添加请求拦截器
service.interceptors.request.use(
  (config) => {
    //console.log("config", config);
    //config.headers["Content-Type"] = "application/json charset=utf-8"; //json数据传输
    userStore = useUserStore();
    if (localStorage.getItem("token")) {
      //token 是否已经过期
      if (diffTokenTime()) {
        userStore.loginOut();
        //ElMessage.warning("登录失效");
        return Promise.reject(new Error("token 失效了"));
      }
    }
    // 在发送请求之前做些什么;
    let token = localStorage.getItem("token");
    config.headers["Authorization"] = token ? token : ""; //请求头带上token
    //loadingInstance = ElLoading.service({ text: "加载中" }); //开启element-ui-plus加载动画组件loading
    // userStore.changeLoading(true);

    return config;
  },
  (error) => {
    // userStore = useUserStore();
    //loadingInstance?.close();
    // userStore.changeLoading(false);
    // 对请求错误做些什么
    return Promise.reject(new Error(error));
  }
);

//响应拦截
service.interceptors.response.use(
  (config) => {
    userStore = useUserStore();
    const { data, meta } = config.data;
    // console.log(meta);
    //状态码为200或201的表示请求成功
    if (meta.status === 200 || meta.status === 201) {
      //loadingInstance?.close();
      // userStore.changeLoading(false);
      return config.data;
    } else {
      //loadingInstance?.close();
      // userStore.changeLoading(false);
      ElMessage.error(meta.msg); //message提示后台错误信息
      return Promise.reject(new Error(meta.msg));
    }
  },
  (error) => {
    //请求失败
    userStore = useUserStore();
    //loadingInstance?.close();
    // userStore.changeLoading(false);
    error.response && ElMessage.error(error.response.data);
    return Promise.reject(new Error(error.response.data));
  }
);
export default service;
