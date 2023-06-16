import { toRaw, unref } from "vue";
import { defineStore } from "pinia";
import { store } from "@/stores";
import type { RouteRecordRaw } from "vue-router";
// import { asyncRoutes, constantRouter } from "@/router/index";
//动态路由相关
export const useAsyncRouteStore = defineStore({
  id: "asyncRoute",
  state: () => ({
    menus: [], //菜单
    routers: [], //静态路由数据
    addRouters: [], //动态路由数据
    keepAliveComponents: [], //缓存状态的组件列表
    isDynamicAddedRoute: false, //是否动态添加了路由
  }),
  getters: {
    getMenus(): RouteRecordRaw[] {
      return this.menus;
    },
    //返回是否已经动态添加了路由
    getIsDynamicAddedRoute(): boolean {
      return this.isDynamicAddedRoute;
    },
  },
  actions: {
    getRouters() {
      return toRaw(this.addRouters);
    },
    //设置改变isDynamicAddedRoute的值
    setDynamicAddedRoute(added: boolean) {
      this.isDynamicAddedRoute = added;
    },
    // 设置动态路由
    setRouters(routers) {
      this.addRouters = routers;
      // this.routers = constantRouter.concat(routers);
    },
    // 设置菜单
    setMenus(menus) {
      this.menus = menus;
    },
    // 设置需要缓存的组件
    setKeepAliveComponents(compNames) {
      this.keepAliveComponents = compNames;
    },
    //这里的data传进来的是userInfo用户信息
    async generateRoutes(data) {
      let permissionsList = data.permissions || []; //权限列表
    },
  },
});
//在setup以外使用
export function useAsyncRouteStoreWithOut() {
  return useAsyncRouteStore(store);
}
