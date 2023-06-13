<template>
  <!-- vue3 element-plus公共弹窗 dialog组件  使用computed和v-model绑定组件实现  -->
  <el-dialog
    v-model="dialogVisible"
    :title="dialogTitle"
    :width="width"
    @close="handleBeforeClose"
    class="dialog-box"
  >
    <span>内容</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  }, //双向数据绑定的值,这里也可以写成modelValue,父组件使用时就要变成v-model绑定  v-model是v-model:modelValue的简写
  dialogTitle: {
    type: String,
    default: "提示",
  }, //dialog 标题
  width: {
    type: String,
    default: "30%",
  }, //dialog 宽度
});
const emit = defineEmits<{
  (e: "update:visible", value: boolean): void;
}>();

//计算属性 使用计算属性结合update:visible实现
const dialogVisible = computed({
  get() {
    return props.visible;
  },
  set(val) {
    emit("update:visible", val); //更新dialog组件双向绑定的数据visible
  },
});

//这里貌似:before-close和@close都行
const handleBeforeClose = () => {
  //   emit("update:visible", false);
};
</script>

<style lang="scss" scoped></style>
