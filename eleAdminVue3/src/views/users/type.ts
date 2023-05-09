export type User = {
  id?: number; //用户id
  username?: string; //用户名
  mobile?: string; //电话号码
  email?: string; //邮箱
  role_name?: string; //角色
  mg_state?: boolean; //状态
  create_time?: string; //创建时间
};

declare type ModalType = "add" | "edit" | "detail" | "";

//基本的弹窗interface接口
export interface BasicModalData<T> {
  showDrawer: boolean;
  modalType: ModalType;
  modalTitle?: string;
  data: T;
  width?: number;
}
