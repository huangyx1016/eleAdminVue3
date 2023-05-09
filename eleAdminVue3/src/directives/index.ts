/**
 * 注册全局自定义指令
 */
import type { App } from "vue";
import focus from "./focus";
import debounce from "./debounce";
import throttle from "./throttle";
import drag from "./drag";
//导出一个初始化注册自定义指令的方法setupDirectives()
export function setupDirectives(app: App) {
  //注册app.directive("指令名",配置项);
  app.directive("focus", focus);
  app.directive("debounce", debounce);
  app.directive("throttle", throttle);
  app.directive("drag", drag);
}
