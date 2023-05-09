import { defineStore } from "pinia";

export const useLangStore = defineStore("lang", {
  //persist: true, //开启数据持久化
  state: () => {
    return {
      lang: "zh", //当前语言
      languageTypeList: [
        { label: "中文", value: "zh" },
        { label: "英文", value: "en" },
      ], //支持的语言类型
    };
  },
  getters: {
    //获取当前语言
    getLang(): any {
      return this.lang;
    },
  },
  actions: {
    //设置当前语言
    setLang(data) {
      this.lang = data;
      localStorage.setItem("lang", data);
    },
  },
});
