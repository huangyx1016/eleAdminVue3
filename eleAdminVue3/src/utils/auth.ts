import { TOKEN_TIME, TOKEN_TIME_VALUE } from "./constant";

// 登录时设置时间
export const setTokenTime = () => {
  localStorage.setItem(TOKEN_TIME, Date.now()); //存储当前时间的时间戳到本地
};

// 获取存储的时间戳
export const getTokenTime = () => {
  return localStorage.getItem(TOKEN_TIME);
};

// 是否已经过期
export const diffTokenTime = () => {
  const currentTime = Date.now();
  const tokenTime = getTokenTime();
  return currentTime - tokenTime > TOKEN_TIME_VALUE; //当前时间-存储的登录时间是有效期否大于有效期TOKEN_TIME_VALUE
};
