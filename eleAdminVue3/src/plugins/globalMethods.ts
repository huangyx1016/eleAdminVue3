import type { App } from "vue";
import moment from "moment";
/**
 * vue3注册全局方法 待完善  类似于vue2的vue.prototype.$fn
 * @param app
 */
export function setupGlobalMethods(app: App) {
  const prototype = app.config.globalProperties; //vue3使用的是
  const isNull = (date) => {
    if (!date) {
      return true;
    }
    if (JSON.stringify(date) === "{}") return true;
    if (JSON.stringify(date) === "[]") return true;
  };
  /**
   * 将时间戳转换成yyyy-MM-dd HH:mm:ss格式的时间
   * @param timestamp 时间戳
   * @param step 几位  js生成的是时间戳是13位的,这里由于后端生成的是10位的时间戳，所以需要对应×多少
   * @param char 年月日的连接符号
   * @param char2 时分秒的连接符号
   * @returns
   */
  prototype.$transformDate = (timestamp, step = 1, char = "-", char2 = ":") => {
    let date = new Date(timestamp * step); //获取当前标准时间
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    month < 10 ? "0" + month : month;
    day < 10 ? "0" + date : day;
    hours < 10 ? "0" + hours : hours;
    minutes < 10 ? "0" + minutes : minutes;
    seconds < 10 ? "0" + seconds : seconds;
    return (
      year +
      char +
      month +
      char +
      day +
      " " +
      hours +
      char2 +
      minutes +
      char2 +
      seconds
    );
  };

  /**
   * 通过momentjs将时间戳格式化为时间格式
   * @param timeStamp 时间戳
   * @param step 几位
   * @param format 格式
   * @returns
   */
  prototype.$transformDateByMoment = (
    timeStamp,
    step = 1,
    format = "YYYY-MM-DD HH:mm:ss"
  ) => {
    const stamp = new Date(timeStamp * step);
    const time = moment(stamp).format(format);
    return time;
  };
}
