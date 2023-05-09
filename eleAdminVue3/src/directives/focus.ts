/**
 * 自定义指令 -- 自动聚焦
 */
const focus = {
  mounted: (el: any) => {
    el.focus();
  },
};
export default focus;
