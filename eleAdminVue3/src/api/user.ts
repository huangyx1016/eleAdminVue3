import request from "@/utils/request";
/**
 * @description 获取用户分页列表
 * @param params
 * @returns
 */
export function getUserPageList(params) {
  return request({
    url: "/users",
    params,
  });
}
/**
 * @description 添加用户
 * @param params
 * @returns
 */
export function addUser(params) {
  return request({
    url: "/users",
    method: "post",
    data: params,
  });
}

/**
 * 根据用户id删除用户信息
 * @param params
 * @returns
 */
export function deleteUserById(id) {
  return request({
    url: "/users/" + id,
    method: "delete", //请求方式
  });
}

/**
 * 根据id数组批量删除用户       暂时没有该接口
 * @param ids
 * @returns
 */
export function deleteUserByIds(ids) {
  return request({
    url: "/users/",
    method: "delete",
    data: { id: ids },
  });
}

/**
 * 根据用户id修改用户信息
 * @param id
 * @returns
 */
export function updateUserById(params) {
  return request({
    url: "/users/" + params.id,
    method: "put",
    data: { email: params.email, mobile: params.mobile },
  });
}

/**
 * 根据用户id查询用户信息
 * @param id
 * @returns
 */
export function getUserById(id) {
  return request({
    url: "/users/" + id,
  });
}
