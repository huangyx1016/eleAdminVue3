<template>
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
import { ref } from "vue";
import { useDark, useToggle } from "@vueuse/core";
import { Moon, Sunny } from "@element-plus/icons-vue";
import { useSettingStore } from "@/stores/modules/setting";
const isDark = useDark();
const toggleDark = useToggle(isDark);
const settingStore = useSettingStore();
const handleChangeTheme = (val) => {
  settingStore.theme = val;
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
