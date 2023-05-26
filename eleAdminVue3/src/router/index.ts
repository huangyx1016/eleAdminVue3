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
            path: "dragTransfer",
            name: "dragTransfer",
            component: () =>
              import(
                "@/views/commonComponentUseExample/dragTransferUseExample.vue"
              ), //树形组件使用
            meta: {
              title: "拖拽穿梭框组件",
            },
          },
        ],
      },
    ],
  },
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  //滚动行为
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { top: 0 };
  },
});

export default router;
