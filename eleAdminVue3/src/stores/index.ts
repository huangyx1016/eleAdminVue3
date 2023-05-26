// import { useUserStore } from "./modules/user";
// import { useLangStore } from "./modules/lang";
// import { useSettingStore } from "./modules/setting";
// //模块化  一般来说会一个模块对应一个store，最后通过一个根store进行整合
// // 统一导出useStore方法
// //需要用的地方只要 import useStore from "@/stores/index"; 然后定义个变量 const store = useStore();
// //需要用的哪个模块的方法只要 store.模块名称.变量|方法 就可以使用状态管理的数据和方法
// export default function useStore() {
//   return {
//     user: useUserStore(),
//     lang: useLangStore(),
//     setting: useSettingStore(),
//   };
// }

import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate"; //pinia持久化插件
import type { App } from "vue";
const store = createPinia();
store.use(piniaPluginPersistedstate);
store.use(({ store }) => {
  const initialState = JSON.parse(JSON.stringify(store.$state));
  store.$reset = () => {
    store.$state = JSON.parse(JSON.stringify(initialState));
  };
});
export function setupStore(app: App) {
  app.use(store);
}
export { store };
