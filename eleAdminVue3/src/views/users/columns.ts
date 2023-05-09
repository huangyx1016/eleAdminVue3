//用户列表表头数据
export const columns = [
  {
    type: "index", //添加一列序号
    label: "序号",
    width: "60",
    align: "center", //对齐方式
    prop: "no",
  },
  {
    type: "selection", //添加一列表格多选checkbox
    width: "55",
  },
  {
    label: "id", //表头显示的label标题
    prop: "id", //字段名称，对应列内容的字段名
    width: "180", //对应列的宽度
  },
  {
    label: "用户名",
    prop: "username",
    width: "180",
  },
  {
    label: "电话号码",
    prop: "mobile",
    width: "180",
  },
  {
    label: "邮箱",
    prop: "email",
    width: "180",
  },
  {
    label: "角色",
    prop: "role_name",
    width: "180",
  },
  {
    label: "状态",
    prop: "mg_state",
    width: "180",
  },
  {
    label: "创建时间",
    prop: "create_time",
    width: "180",
  },
  {
    label: "操作", //表头显示的label标题
    prop: "action", //字段名称，对应列内容的字段名
    width: "250", //对应列的宽度
    fixed: "right", //列是否固定在左侧或者右侧。 true 表示固定在左侧
  },
];
