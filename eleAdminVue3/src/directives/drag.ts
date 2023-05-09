/**
 * 拖拽指令
 * 设置需要拖拽的元素为相对定位，其父元素为绝对定位
 * 鼠标按下(onmousedown)时记录目标元素当前的 left 和 top 值
 * 鼠标移动(onmousemove)时计算每次移动的横向距离和纵向距离的变化值，并改变元素的 left 和 top 值
 * 使用：在 Dom 上加上 v-drag 即可
 **/
import type { Directive } from "vue";
// interface ElType extends HTMLElement {
//   parentNode: any;
// }

const drag: Directive = {
  mounted: function (el: HTMLElement, binding) {
    console.log(el, binding);
    el.style.cursor = "move";
    el.style.position = "absolute";
    //鼠标按下时
    el.onmousedown = function (e) {
      console.log("onmousedown e", e);
      let disX = e.pageX - el.offsetLeft;
      let disY = e.pageY - el.offsetTop;
      //鼠标移到
      document.onmousemove = function (e) {
        console.log("onmousemove e", e);
        let x = e.pageX - disX;
        let y = e.pageY - disY;
        let maxX = el.parentNode.offsetWidth - el.offsetWidth;
        let maxY = el.parentNode.offsetHeight - el.offsetHeight;
        if (x < 0) {
          x = 0;
        } else if (x > maxX) {
          x = maxX;
        }

        if (y < 0) {
          y = 0;
        } else if (y > maxY) {
          y = maxY;
        }
        el.style.left = x + "px";
        el.style.top = y + "px";
      };
      //鼠标抬起
      document.onmouseup = function () {
        document.onmousemove = document.onmouseup = null;
      };
    };
  },
};

export default drag;
