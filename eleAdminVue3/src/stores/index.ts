import { useUserStore } from "./user";
import { useLangStore } from "./lang";
import { useSettingStore } from "./setting";
//模块化  一般来说会一个模块对应一个store，最后通过一个根store进行整合
// 统一导出useStore方法
//需要用的地方只要 import useStore from "@/stores/index"; 然后定义个变量 const store = useStore();
//需要用的哪个模块的方法只要 store.模块名称.变量|方法 就可以使用状态管理的数据和方法
export default function useStore() {
  return {
    user: useUserStore(),
    lang: useLangStore(),
    setting: useSettingStore(),
  };
}
