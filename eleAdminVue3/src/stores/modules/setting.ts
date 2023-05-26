import { defineStore } from "pinia";
import { store } from "@/stores";
export const useSettingStore = defineStore("setting", {
  state: () => ({
    theme: "",
  }),
  getters: {},
  actions: {},
});
//在setup以外使用
export function useSettingStoreWithOut() {
  return useSettingStore(store);
}
