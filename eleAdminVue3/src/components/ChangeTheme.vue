<template>
  <!-- 切换深色/浅色模式组件 后期需要考虑使用hooks来实现 -->
  <el-switch
    v-model="settingStore.theme"
    inline-prompt
    :active-icon="Moon"
    :inactive-icon="Sunny"
    active-value="Dark"
    inactive-value="Light"
    class="switch-theme"
    style="
      --el-switch-on-color: #313136;
      --el-switch-off-color: #f6f6f7;
      --el-switch-border-color: #333;
    "
    @change="handleChangeTheme"
  />
</template>

<script lang="ts" setup>
import { ref, watchEffect } from "vue";
import { useDark, useToggle } from "@vueuse/core";
import { Moon, Sunny } from "@element-plus/icons-vue";
import { useSettingStore } from "@/stores/modules/setting";
const isDark = useDark({
  // 存储到localStorage/sessionStorage中的Key 根据自己的需求更改
  //storageKey: "useDarkKEY",
  // 暗黑class名字
  //valueDark: "dark",
  // 高亮class名字
  // valueLight: "light",
});

const settingStore = useSettingStore();
const toggleDark = useToggle(isDark);
/**
 * @change="handleChangeTheme"
 * switch开关组件值改变的回调
 */
const handleChangeTheme = (val) => {
  settingStore.theme = val;
  // console.log("settingStore.theme", settingStore.theme);
  toggleDark();
};
</script>

<style lang="scss" scoped>
.el-switch {
  :deep(.el-switch__core) {
    .el-switch__inner {
      .el-icon {
        // position: absolute;
        // left: 2px;
        // z-index: 999;
      }
    }
  }
}
</style>
