/**
 * vue3 注册全局自定义指令
 */
import type { App } from "vue";
import focus from "@/directives/focus";
import debounce from "@/directives/debounce";
import throttle from "@/directives/throttle";
//导出一个初始化注册自定义指令的方法setupDirectives()
export function setupDirectives(app: App) {
  //注册app.directive("指令名",配置项);
  //聚焦指令
  app.directive("focus", focus);
  //防抖指令
  app.directive("debounce", debounce);
  //节流指令
  app.directive("throttle", throttle);
}
