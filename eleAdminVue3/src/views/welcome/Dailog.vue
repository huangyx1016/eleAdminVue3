<template>
  <el-dialog
    v-model="modalShow"
    :title="modalData.modalTitle"
    :close-on-click-modal="false"
    width="30%"
    class="dialog-box"
  >
    <span>This is a message</span>
    <p>{{ modalData }}</p>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="modalShow = false">取消</el-button>
        <el-button type="primary" @click="modalShow = false"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, toRef, nextTick, computed } from "vue";
const props = defineProps({
  modalData: {
    type: Object,
    // required: true,
    default: () => {
      return {};
    },
  },
  show: {
    type: Boolean,
    default: false,
  },
  id: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits<{
  (e: "update:show", value: boolean);
}>();

const modalDataComputed = computed(() => {
  return props.modalData;
});
console.log("modalDataComputed", modalDataComputed.value);
//计算属性
const modalShow = computed({
  get() {
    return props.modalData.showModal;
  },
  set(val) {
    emit("update:show", val); //更新组件双向绑定的值
  },
});
console.log("props.id", props.id);
console.log("props.modalData", props.modalData);
if (props.modalData.data === 1) {
  console.log("xxx");
}
</script>

<style lang="scss" scoped></style>
