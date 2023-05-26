import { useLangStore } from "@/stores/modules/lang";

import { createI18n } from "vue-i18n";
import zh from "./zh";
import en from "./en";
const messages = {
  zh: {
    ...zh,
  },
  en: {
    ...en,
  },
};
// const language = langStore.lang;
// console.log("language", language);
//console.log(localStorage.getItem("lang"));
//navigator.language能够获取当前浏览器的语言环境zh-CN是中文，en-US是英文
//console.log("navigator.language.slice(0, 2)", navigator.language.slice(0, 2));
const i18n = createI18n({
  globalInjection: true, //全局生效$t
  legacy: false, //legacy：默认为 true，但如果使用的是 Composition API 则需要定义为 false
  // 如果本地有语言标识就采用本地，没有就根据浏览器语言默认标识显示语言
  locale: localStorage.getItem("lang") || "zh", //当前要展示的语言
  messages: messages, //不同语言对应的翻译文件
});
export default i18n;
