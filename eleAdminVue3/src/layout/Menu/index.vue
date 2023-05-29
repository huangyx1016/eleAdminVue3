<template>
  <!-- 
    el-menu 菜单组件
    router:是否启用 vue-router 模式。 启用该模式会在激活导航时以 index 作为 path 进行路由跳转 使用 default-active 来设置加载时的激活项。 
    element-plus Menu组件 设置了router就可以不用点击后router.push()跳转路由
   -->
  <el-menu
    active-text-color="#ffd04b"
    background-color="var(--menu-bg)"
    class="el-menu-vertical-demo"
    text-color="#fff"
    unique-opened
    router
    :default-active="defaultActive"
    :collapse="userStore.getIsCollapse"
  >
    <!-- 菜单项 -->
    <MenuItemStatic
      v-for="(item, index) in menuData"
      :key="item.id"
      :item="item"
    />
  </el-menu>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from "vue";
import { menuList } from "@/api/menu";
import MenuItemStatic from "./MenuItemStatic.vue";
import { useUserStore } from "@/stores/modules/user";
import { useRoute } from "vue-router";
// import variable from "@/style/variable.scss";
const route = useRoute();
const userStore = useUserStore();

let menuData: any = ref([]); //左侧菜单menu数据
const defaultActive = ref(sessionStorage.getItem("path") || "/"); //如果sessionStorage里有保存的path路由，就使用sessionStorage里的，否则就给个默认的/ 默认为选中欢迎页

//初始化菜单 发送请求获取menu数据
const initMenuList = async () => {
  const res = await menuList();
  //console.log("左侧菜单数据", res);
  menuData.value = res;
};

menuData.value = userStore.userInfo.menuList; //这里使用的是用户登录后存在store里面的菜单按钮 这里暂时是静态数据
onMounted(() => {
  //initMenuList(); //调用获取菜单数据接口请求菜单数据
});
/**
 * 保存defaultActive 保存默认的菜单选中项到sessionStorage中
 * @param path 路由路径
 */
const savePath = (path) => {
  // console.log("path", path);
  sessionStorage.setItem("path", path);
};
//监听路由变化
watch(
  route,
  (val) => {
    //console.log("val", JSON.parse(JSON.stringify(val)));
    savePath(val.path);
  },
  { deep: true, immediate: true }
);
</script>

<style lang="scss" scoped>
.el-menu {
  border-right: none;
}
//添加element-ui 不折叠时的样式
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 210px;
  min-height: 400px;
}
</style>
