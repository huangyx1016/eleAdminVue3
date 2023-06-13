//封装自定义hooks useWH() 获取屏幕宽高
import { reactive } from "vue";
export function useWH() {
  const screen = reactive({
    width: 0,
    height: 0,
  });
  //获取屏幕宽高
  const getScreenWH = () => {
    screen.width = document.documentElement.clientWidth;
    screen.height = document.documentElement.clientHeight;
  };
  return { screen, getScreenWH };
}
