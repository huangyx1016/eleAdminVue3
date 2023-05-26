import { defineStore } from "pinia";
import { store } from "@/stores";
export const useAsyncRouteStore = defineStore("asyncRoute", {
  state: () => ({
    menus: [],
  }),
  getters: {},
  actions: {},
});
//在setup以外使用
export function useAsyncRouteStoreWithOut() {
  return useAsyncRouteStore(store);
}
