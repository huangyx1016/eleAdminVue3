import type { App } from "vue";
import { createRouterGuards } from "./permission"; //路由守卫
import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/login/index.vue"),
    meta: {
      title: "用户登录",
    },
  },
  {
    path: "/",
    name: "/",
    meta: {
      title: "首页",
    },
    component: () => import("../layout/index.vue"), //布局
    redirect: "/welcome", //重定向到users  欢迎页
    children: [
      {
        path: "welcome",
        name: "welcome",
        component: () => import("@/views/welcome/index.vue"),
        meta: {
          title: "欢迎页",
        },
      },
      {
        path: "users",
        name: "users",
        component: () => import("@/views/users/index.vue"),
        meta: {
          title: "用户管理",
        },
      },
      {
        path: "goods",
        name: "goods",
        component: () => import("@/views/goods/index.vue"),
        meta: {
          title: "货品管理",
        },
      },
      {
        path: "orders",
        name: "orders",
        component: () => import("@/views/orders/index.vue"),
        meta: {
          title: "订单管理",
        },
      },

      {
        path: "reports",
        name: "reports",
        component: () => import("@/views/reports/index.vue"),
        meta: {
          title: "数据统计",
        },
      },
      {
        path: "rights",
        name: "rights",
        component: () => import("@/views/rights/index.vue"),
        meta: {
          title: "权限管理",
        },
      },
      {
        path: "roles",
        name: "roles",
        component: () => import("@/views/roles/index.vue"),
        meta: {
          title: "角色管理",
        },
      },
      {
        path: "father",
        name: "father",
        component: null,
        meta: {
          title: "多级菜单",
        },
        children: [
          {
            path: "child",
            name: "child",
            component: () => import("@/views/child/index.vue"), //子菜单
            meta: {
              title: "子菜单",
            },
          },
        ],
      },
      {
        path: "commonExample",
        name: "commonExample",
        component: null,
        meta: {
          title: "组件使用",
        },
        children: [
          {
            path: "tree",
            name: "tree",
            component: () =>
              import("@/views/commonComponentUseExample/treeUseExample.vue"), //树形组件使用
            meta: {
              title: "树形组件",
            },
          },
          {
            path: "transfer",
            name: "transfer",
            component: () =>
              import(
                "@/views/commonComponentUseExample/transferUseExample.vue"
              ), //树形组件使用
            meta: {
              title: "穿梭框组件",
            },
          },
          {
            path: "getScreenWidth",
            name: "getScreenWidth",
            component: () =>
              import("@/views/commonComponentUseExample/getScreenWith.vue"),
            meta: {
              title: "获取页面宽高", //获取当前页面的宽度和高度
            },
          },
          {
            path: "test",
            name: "test",
            component: () =>
              import("@/views/commonComponentUseExample/test.vue"),
            meta: {
              title: "测试页面", //测试页面
            },
          },
        ],
      },
    ],
  },
];

const modules = import.meta.globEager("./**/*.ts"); //import.meta.globEager 批量立即导入文件  这里导入的是其他路由的ts文件
//const modules2 = import.meta.glob("./**/*.ts"); //import.meta.glob 是批量异步引入
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), //路由模式 历史模式
  routes, //静态路由
  //滚动行为 每次切换路由时 距离顶部的距离
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    // 始终滚动到顶部
    return { top: 800 };
  },
});

//router.getRoutes()：获取一个包含所有路由记录的数组
// console.log("getRoutes", router.getRoutes());
//动态添加路由 router.addRoute({path:"",name:"",component:()=>import()});
// router.addRoute({
//   path: "/test",
//   name: "test",
//   component: () => import("@/views/commonComponentUseExample/test.vue"),
// });
// console.log("getRoutes", router.getRoutes());
//动态删除路由
//1、可以添加一个name相同的路由来实现
//2、 通过removeRoute('路由名称')
// router.removeRoute("test");
// console.log("getRoutes", router.getRoutes());

//初始化路由的方法 setupRouter()  需要在main.ts中引入使用
export function setupRouter(app: App) {
  app.use(router);
  createRouterGuards(router); //路由守卫 包括路由前置/后置守卫的使用
  // router.addRoute();//动态添加路由表需要使用router.addRoute()来实现
}

export default router;
