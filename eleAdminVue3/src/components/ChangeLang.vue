<template>
  <!-- vue i18n切换语言的组件 -->
  <el-dropdown @command="handleCommandLang">
    <!-- <div class="el-dropdown-link">
            切换语言
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </div> -->
    <!-- <el-button type="default">
      {{ curLangLabel }}<el-icon class="el-icon--right"><arrow-down /></el-icon>
    </el-button> -->
    <span>
      <svg-icon
        iconName="icon-language"
        size="40px"
        color="#333"
        title="切换语言"
      ></svg-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="(item, index) in langStore.languageTypeList"
          :key="index"
          :command="item.value"
          :disabled="currentLanguage === item.value"
          >{{ item.label }}</el-dropdown-item
        >
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { useLangStore } from "@/stores/modules/lang";
import { useI18n } from "vue-i18n";
const { locale } = useI18n();
const langStore = useLangStore();
const handleCommandLang = (command) => {
  //console.log(command);
  langStore.setLang(command); //状态管理设置当前语言
  locale.value = command; //设置i18n语言
};
const curLangLabel = computed(() => {
  if (langStore.lang) {
    return langStore.lang === "zh" ? "中文" : "英文";
  } else {
    return "切换语言";
  }
});

const currentLanguage = computed(() => {
  return locale.value;
});
</script>

<style lang="scss" scoped></style>
