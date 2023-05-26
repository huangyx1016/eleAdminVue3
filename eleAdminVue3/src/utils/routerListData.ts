//静态路由列表数据
export const routerList = [
  {
    id: 0, //自增id
    path: "/", //路由路径
    name: "/", //路由名称
    component: "/layout/index", //组件位置
    redirect: "/welcome", //重定向
    meta: {
      icon: "House", //图标
      title: "首页", //导航文字
    },
    fid: "", //一级导航id
  },
  {
    id: 1, //自增id
    path: "/users", //路由路径
    name: "users", //路由名称
    component: "/users/index", //组件位置
    meta: {
      icon: "User", //图标
      title: "用户管理", //导航文字
    },
    fid: "", //一级导航id
  },
  {
    id: 2, //自增id
    path: "/rights", //路由路径
    name: "rights", //路由名称
    component: "/rights/index", //组件位置
    meta: {
      icon: "Lock", //图标
      title: "权限管理", //导航文字
    },
    fid: "", //一级导航id
  },
  {
    id: 3, //自增id
    path: "/goods", //路由路径
    name: "goods", //路由名称
    component: "/goods/index", //组件位置
    meta: {
      icon: "Discount", //图标
      title: "货品管理", //导航文字
    },
    fid: "", //一级导航id
  },
  {
    id: 4, //自增id
    path: "/orders", //路由路径
    name: "orders", //路由名称
    component: "/orders/index", //组件位置
    meta: {
      icon: "Lock", //图标
      title: "订单管理", //导航文字
    },
    fid: "", //一级导航id
  },
  {
    id: 5, //自增id
    path: "/reports", //路由路径
    name: "reports", //路由名称
    component: "/reports/index", //组件位置
    meta: {
      icon: "EditPen", //图标
      title: "数据统计", //导航文字
    },
    fid: "", //一级导航id
  },
  {
    id: 6, //自增id
    path: "/father", //路由路径
    name: "father", //路由名称
    component: "", //组件位置
    meta: {
      icon: "EditPen", //图标
      title: "多级菜单", //导航文字
    },
    fid: "", //一级导航id
    children: [
      {
        id: 7, //自增id
        path: "child", //路由路径
        name: "child", //路由名称
        component: "/child/index", //组件位置
        meta: {
          icon: "EditPen", //图标
          title: "子菜单", //导航文字
        },
        fid: 6, //一级导航id
      },
    ],
  },
  {
    id: 8, //自增id
    path: "/commonExample", //路由路径
    name: "commonExample", //路由名称
    component: "", //组件位置
    meta: {
      icon: "EditPen", //图标
      title: "组件使用", //导航文字
    },
    children: [
      {
        id: 9, //自增id
        path: "tree", //路由路径
        name: "tree", //路由名称
        component: "/commonExample/treeUseExample", //组件位置
        meta: {
          icon: "EditPen", //图标
          title: "树形组件", //导航文字
        },
        fid: 8, //一级导航id
      },
      {
        id: 10, //自增id
        path: "transfer", //路由路径
        name: "transfer", //路由名称
        component: "/commonExample/transferUseExample", //组件位置
        meta: {
          icon: "EditPen", //图标
          title: "穿梭框组件", //导航文字
        },
        fid: 8, //一级导航id
      },
      {
        id: 11, //自增id
        path: "dragTransfer", //路由路径
        name: "dragTransfer", //路由名称
        component: "/commonExample/dragTransferUseExample", //组件位置
        meta: {
          icon: "EditPen", //图标
          title: "拖拽穿梭框组件", //导航文字
        },
        fid: 8, //一级导航id
      },
    ],
    fid: "", //一级导航id
  },
];
