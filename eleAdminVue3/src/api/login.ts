import request from "@/utils/request";
//用户登录
export function login(data: any) {
  return request({
    url: "/login",
    method: "POST",
    data,
  });
}
