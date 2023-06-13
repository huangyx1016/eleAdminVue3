import { createApp } from "vue";

import App from "./App.vue";
import "@/assets/reset.css"; //重置样式表

//引入element-ui-plus
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
import { setupRouter } from "./router"; //引入路由
setupRouter(app); //挂载路由

import { setupStore } from "@/stores"; //引入pinia状态管理
setupStore(app); //挂载pinia状态管理

import { setupDirectives } from "@/directives/index"; //自定义指令初始化
app.use(setupDirectives);

import vueI18n from "./lang/index"; //导入国际化插件i18n
app.use(vueI18n);

import "virtual:svg-icons-register"; //引入vite-plugin-svg-icons注册脚本
import SvgIcon from "./components/SvgIcon.vue"; //全局引入SvgIcon图标组件
app.component("SvgIcon", SvgIcon); //注册SvgIcon为全局组件

import { setupGlobalMethods } from "@/plugins";
setupGlobalMethods(app); //挂载全局插件方法

app.mount("#app");
