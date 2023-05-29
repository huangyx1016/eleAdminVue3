import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import "@/assets/reset.css"; //重置样式表

//引入element-ui-plus
// import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "element-plus/theme-chalk/dark/css-vars.css";
import "@/style/index.scss";
// import "./assets/main.css";
//引入element-ui-plus图标
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

//导入iconfont在线svg图标生成的js文件  可以实现在iconfont远程管理项目需要的图标文件
import "./assets/iconfont/iconfont.js";
// //导入pinia数据持久化插件  下载依赖包：npm i  pinia-plugin-persistedstate
// import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
// //引入pinia 状态管理
// const pinia = createPinia();
// pinia.use(piniaPluginPersistedstate);
// //引入 pinia的$reset重置状态管理初始状态的reset方法
// pinia.use(({ store }) => {
//   const initialState = JSON.parse(JSON.stringify(store.$state));
//   store.$reset = () => {
//     store.$state = JSON.parse(JSON.stringify(initialState));
//   };
// });
// app.use(pinia);

import { setupStore } from "@/stores";
setupStore(app);

//导入permission路由守卫
import "@/router/permission";
app.use(router);

import { setupDirectives } from "@/directives/index"; //自定义指令初始化
app.use(setupDirectives);

import vueI18n from "./lang/index"; //导入国际化插件i18n
app.use(vueI18n);

import "virtual:svg-icons-register"; //引入vite-plugin-svg-icons注册脚本
import SvgIcon from "./components/SvgIcon.vue"; //引入SvgIcon图标组件
app.component("SvgIcon", SvgIcon); //注册SvgIcon为全局组件

import { setupGlobalMethods } from "@/plugins/";
setupGlobalMethods(app); //注册全局插件方法

//使用element-ui-plus
// app.use(ElementPlus);
app.mount("#app");
