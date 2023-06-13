import { ref, onMounted, onUnmounted } from "vue";
export function useTime() {
  let timer;
  const year = ref(0); //年
  const month = ref(0); //月
  const day = ref(0); //天数
  const week = ref(""); //星期几
  const hour = ref(0); //时
  const minute = ref(0); //分
  const second = ref(0); //秒

  //获取当前格式化的系统时间
  const getNowFormatTime = (char1: "-", char2: ":") => {
    const date = new Date();
    year.value = date.getFullYear();
    month.value = date.getMonth() + 1;
    day.value = date.getDate();
    console.log("day", date.getDay());
    week.value = "日一二三四五六".charAt(date.getDay());
    hour.value = date.getHours();
    minute.value = date.getMinutes();
    second.value = date.getSeconds();
    let time =
      year.value +
      char1 +
      (month.value < 10 ? "0" + month.value : month.value) +
      char1 +
      (day.value < 10 ? "0" + day.value : day.value) +
      " " +
      (hour.value < 10 ? "0" + hour.value : hour.value) +
      char2 +
      (minute.value < 10 ? "0" + minute.value : minute.value) +
      char2 +
      (second.value < 10 ? "0" + second.value : second.value) +
      " " +
      "星期" +
      week.value;
    return time;
  };

  onMounted(() => {
    clearInterval(timer);
    timer = setInterval(() => getNowFormatTime, 1000);
  });

  onUnmounted(() => {
    //组件销毁时清除定时器
    clearInterval(timer);
  });

  return { year, month, day, hour, minute, second, week, getNowFormatTime };
}
