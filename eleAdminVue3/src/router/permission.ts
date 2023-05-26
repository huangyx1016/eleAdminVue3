/**
 * 路由权限效验  路由守卫使用
 */
import { useUserStore } from "@/stores/modules/user";
import router from "./index";
import { ElMessage } from "element-plus";

/**
 * 判断登录用户是否拥有该路由的权限
 * @param roles 角色数组
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    //some() 有一个满足条件就返回true
    return roles.some((role) => route.meta.roles.includes(role));
  } else {
    return true;
  }
}

const whiteList = ["/login"]; //白名单路由数组
//路由守卫  router.beforeEach((to,from,next)=>{}); 路由前置守卫
//to:即将要进入的目标   from:当前导航正要离开的路由   next():向下走
router.beforeEach((to, from, next) => {
  let defaultSystemTitle = "vue3后台管理系统";
  document.title = to.meta.title
    ? to.meta.title + "-" + defaultSystemTitle
    : defaultSystemTitle; //通过路由守卫的meta.title设置网页title标签名称
  const token = localStorage.getItem("token");
  if (token) {
    next();
  } else {
    if (whiteList.includes(to.path)) {
      next();
    } else {
      console.log("路由守卫");
      ElMessage.error("您还未登录,请登录");
      setTimeout(() => {
        next("/login");
      }, 1500); //1.5秒后跳转回登录页面
    }
  }
});
