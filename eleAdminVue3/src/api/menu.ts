import request from "@/utils/request";
export function menuList() {
  return request({
    url: "/menus",
    method: "get",
  });
}
