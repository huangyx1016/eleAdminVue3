import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { login as loginApi } from "@/api/login";
import router from "@/router";
import { setTokenTime } from "@/utils/auth";
import { recursion } from "@/utils/recursionMenu";
import { routerList } from "@/utils/routerListData";
import { store } from "@/stores";

//用户相关状态管理pinia的store  这里是组合式api的写法
/**
 * ref() 就是 state 属性
 * computed() 就是 getters
 * function() 就是 actions
 * 为了从 store 中提取属性时保持其响应性，你需要使用 storeToRefs()
 */
export const useUserStore = defineStore(
  "user",
  () => {
    // const token = ref("");
    const userInfo = ref({
      token: "", //登录的token
      menuList: [], //菜单
      routerList: [], //路由
      username: "", //用户名
      rid: null, //角色id
      email: "", //邮箱
      mobile: "", //手机号码
    }); //登录用户信息
    const loading = ref(false); //按钮的loading
    const isCollapse = ref(false); //是否折叠 默认false 不折叠
    //获取token
    const getToken = computed(() => {
      return userInfo.value.token;
    });
    //获取折叠状态isCollapse的值
    const getIsCollapse = computed(() => {
      return isCollapse.value;
    });

    function changeLoading(data) {
      loading.value = data;
    }
    //改变菜单折叠状态
    function changeIsCollapse() {
      isCollapse.value = !isCollapse.value;
    }

    //设置登录用户信息
    function setUserInfo(data) {
      userInfo.value = data; //设置userInfo
      localStorage.setItem("token", userInfo.value.token); //将token存储到本地localStorage
      setTokenTime(); //登录时间 存储到本地localStorage  保存的是登录的当前时间戳
    }

    //router.addRoute() 动态添加路由的方法  后面需要使用路由动态添加的方式生成路由
    function addRoute() {
      let routerList = userInfo.value.routerList;
      // userInfo.value.menuList.forEach((item) => {
      //   router.addRoute("index", item);
      // });
    }
    /**
     *
     * @param loginForm 用户登录表单对象
     * @returns
     */
    function login(loginForm) {
      //默认账号  本地模拟登录
      if (loginForm.username === "admin" && loginForm.password === "admin") {
        console.log("默认账号登录");
        let menuList = [];
        menuList = recursion(routerList);
        let token = "defaultToken"; //默认账号登录的默认token
        let userInfo = {
          token: token,
          menuList: menuList, //菜单
          routerList: [], //路由
          username: loginForm.username,
          rid: null,
          email: "",
          mobile: "",
        };
        setUserInfo(userInfo);
        router.replace("/"); //登录成功后跳转主页
      } else {
        //通过接口账号密码登录
        //返回一个新的promise
        return new Promise((resolve, reject) => {
          loginApi(loginForm)
            .then((res: any) => {
              console.log("res", res);
              //登录成功
              if (res.meta.status === 200 && res.data) {
                let menuList = []; //左侧menu菜单列表
                menuList = recursion(routerList);
                let userInfo = {
                  token: res.data.token,
                  menuList: menuList, //菜单列表
                  routerList: [], //路由列表
                  username: res.data.username,
                  rid: res.rid,
                  email: res.email,
                  mobile: res.mobile,
                };
                setUserInfo(userInfo);
                //addRoute();
                resolve(res);
                router.replace("/"); //登录成功后跳转主页  router.replace() 替换掉当前history记录
              }
            })
            .catch((err) => {
              reject(err);
            });
        });
      }
    }
    //登录失效或者用户退出登录
    function loginOut() {
      useUserStore().$reset(); //重置state状态  使用$reset()重置store为初始状态
      localStorage.clear(); //清除本地存储
      sessionStorage.clear(); //清除临时存储  sessionStorage页面刷新不会清空，只有在关闭页面时才会清空
      router.replace("/login"); //用户退出后跳转到登录页
    }
    return {
      userInfo,
      loading,
      isCollapse,
      getToken,
      getIsCollapse,
      changeLoading,
      changeIsCollapse,
      setUserInfo,
      addRoute,
      login,
      loginOut,
    };
  },
  {
    persist: true, //pinia数据持久化
  }
);

//在setup以外使用
export function useUserStoreWithOut() {
  return useUserStore(store);
}
