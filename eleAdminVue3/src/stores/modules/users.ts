import { defineStore } from "pinia";

export const useUsersStore = defineStore({
  id: "users",
  state: () => {
    return {
      title: "pinia选项式写法",
      userName: "",
    };
  },
  getters: {},
  actions: {},
  //pinia数据持久化插件配置
  persist: {
    // key:"persistedstate",
    storage: sessionStorage,
  },
});
