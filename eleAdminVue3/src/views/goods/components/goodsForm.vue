<template>
  <!-- 商品表单 -->
  <el-dialog v-model="modalData.showModal" :title="modalData.modalTitle">
    <el-form
      :model="goodsFormModel"
      :rules="goodsFormRules"
      label-width="120px"
    >
      <el-form-item label="商品名称">
        <el-input v-model="goodsFormModel.goods_name" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="modalData.showModal = false">取消</el-button>
        <el-button type="primary" @click="submitForm"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, toRef } from "vue";
import type { PropType } from "vue";
interface BasicModalData<T> {
  showModal: boolean; //显示/隐藏弹窗
  modalType: "add" | "edit" | "del" | "detail"; //操作类型
  modalTitle?: string; //弹窗标题
  data: T; //携带的数据
}
const props = defineProps({
  modalData: {
    type: Object as PropType<BasicModalData<number>>,
    required: true,
  },
});
const emit = defineEmits<{
  (e: "submit"): void;
}>();
const createDefaultGoodsForm = () => {
  return {
    goods_name: "",
  };
};
const goodsFormModel = ref(createDefaultGoodsForm());
const goodsFormRules = {}; //表单效验规则
//创建一个 ref 对象，其value值指向另一个对象中的某个属性。
//语法：const name = toRef(person,'name')
//要将响应式对象中的某个属性单独提供给外部使用时。
const modalData = toRef(props, "modalData"); //相当于引用一个对象的属性，修改的值变化会同步变化
//提交表单
const submitForm = () => {
  emit("submit");
};
</script>

<style lang="scss" scoped></style>
