//工具方法
/**
 * 返回当前日期时间 yyyy-mm-dd HH:MM:ss 格式  ep:2023-04-11 10:45:25
 * @param char  连接符 -
 * @param char2 连接符 :
 * @returns
 */
export function getNowFormatTime(char = "-", char2 = ":") {
  let nowDate = new Date();
  let year = nowDate.getFullYear();
  let month = nowDate.getMonth() + 1;
  let day = nowDate.getDate();
  let hours = nowDate.getHours();
  let minutes = nowDate.getMinutes();
  let seconds = nowDate.getSeconds();
  let week = "日一二三四五六".charAt(nowDate.getDay()); //星期几
  // console.log("nowDate.getDay()", nowDate.getDay());
  //补全0，并拼接
  let time =
    year +
    char +
    (month < 10 ? "0" + month : month) +
    char +
    (day < 10 ? "0" + day : day) +
    " " +
    (hours < 10 ? "0" + hours : hours) +
    char2 +
    (minutes < 10 ? "0" + minutes : minutes) +
    char2 +
    (seconds < 10 ? "0" + seconds : seconds) +
    " " +
    "星期" +
    week;
  return time;
}
/**
 *将时间戳转换为指定格式的日期时间
 * @param timestamp 时间戳  js时间戳是13位 ，正常java后端时间戳也是13位  这里因为后台返回的时间戳是10位所以*1000
 * @param step 几位要×几
 * @char 年月日的连接符号
 * @char2 时分秒的连接符号
 * @returns
 */
export function transformDate(timestamp, step = 1, char = "-", char2 = ":") {
  let date = new Date(timestamp * step);
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
}
