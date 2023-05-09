//格式化 后端 结构信息并递归生成层级路由表的方法
export const recursion = (routerList, parent?): any[] => {
  return routerList.map((item: any) => {
    const currentRouter: any = {
      id: item.id,
      path: parent && parent.path ? parent.path + "/" + item.path : item.path,
      name: item.name,
      component: item.component,
      meta: {
        icon: item.meta.icon,
        title: item.meta.title,
      },
      fid: item.fid,
    };
    //判断是否有子菜单进行递归处理
    if (item.children && item.children.length > 0) {
      //如果未定义 redirect 默认第一个子路由为 redirect
      //   if (!item.redirect) {
      //     currentRouter.redirect = `${item.path}/${item.children[0].path}`;
      //   }
      currentRouter.children = recursion(item.children, currentRouter);
    }
    return currentRouter;
  });
};
