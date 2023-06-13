import { defineStore } from "pinia";
import { store } from "@/stores";
export const useSettingStore = defineStore("setting", {
  // persist: true, //开启数据持久化
  state: () => ({
    theme: "Light",
  }),
  getters: {},
  actions: {},
});
//在setup以外使用
export function useSettingStoreWithOut() {
  return useSettingStore(store);
}
