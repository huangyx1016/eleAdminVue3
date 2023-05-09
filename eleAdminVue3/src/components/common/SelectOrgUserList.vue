<template>
  <!-- 带复选框的下拉菜单 -->
  <div class="container">
    <el-select
      v-model="selected"
      multiple
      placeholder="请选择"
      @change="handleChange"
    >
      <el-checkbox
        class="check-all"
        v-model="isAllSelected"
        @change="handleAllChange"
        >全选/全不选</el-checkbox
      >
      <el-option
        v-for="(item, index) in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
        <!-- <el-checkbox
          @change="handleCheckChange(item.value)"
          :value="selected.includes(item.value)"
          :label="item.label"
        ></el-checkbox> -->

        <el-checkbox
          v-model="item.checked"
          :label="item.value"
          @change="handleCheckChange(item.value)"
          @click.prevent.native
          >{{ item.label }}</el-checkbox
        >
      </el-option>
      <div class="operation-btn">
        <el-button type="primary" @click="handleConfirm">确定</el-button>
        <el-button @click="handleCancel">取消</el-button>
      </div>
    </el-select>
  </div>
</template>

<script lang="ts" setup>
import { ref, watchEffect } from "vue";
// const props = defineProps({
//   options: {
//     type: Array,
//     required: true,
//     default: () => {
//       return [
//         { value: 1, label: "选项一" },
//         { value: 2, label: "选项二" },
//         { value: 3, label: "选项三" },
//       ];
//     },
//   },
// });
type optionsType = {
  label: string;
  value: number;
  checked: boolean;
};
interface IProps<T> {
  options: T[];
  modelValue: number[];
}
const props = withDefaults(defineProps<IProps<optionsType>>(), {
  options: () => {
    return [
      { value: 1, label: "选项一", checked: false },
      { value: 2, label: "选项二", checked: false },
      { value: 3, label: "选项三", checked: false },
    ];
  },
  modelValue: () => [],
});

const emit = defineEmits(["update:modelValue", "change"]);

const selected = ref([]);
const isAllSelected = ref(false);

// 监听选中值变化，如果全部选中则勾选全选框
watchEffect(() => {
  props.options.forEach((item) => {
    if (selected.value.includes(item["value"])) {
      item.checked = true;
    } else {
      item.checked = false;
    }
  });
  //判断下拉绑定的值是不是等于下拉options的数组长度
  if (selected.value.length === props.options.length) {
    isAllSelected.value = true; //勾选全选checkbox
  } else {
    isAllSelected.value = false; //取消勾选全选checkbox
  }
});

//select下拉绑定的值改变的回调 处理选中值变化事件
const handleChange = (value) => {
  selected.value = value;
  emit("update:modelValue", selected.value); //更新v-model绑定的值
  emit("change", selected.value);
};

// 处理全选/全不选事件
const handleAllChange = (value) => {
  if (value) {
    //如果全选
    selected.value = props.options.map((item) => item.value);
  } else {
    //全不选 就置空
    selected.value = [];
  }
  emit("update:modelValue", selected.value);
  emit("change", selected.value);
};

/**
 *checkbox的值改变的回调
 * @param val 该项option的值
 */
const handleCheckChange = (val) => {
  if (selected.value.includes(val)) {
    selected.value = selected.value.filter((n) => n !== val);
  } else {
    selected.value.push(val);
  }
  //   console.log("selected", JSON.parse(JSON.stringify(selected.value)));
};

//点击确定按钮 传递选择的下拉值
const handleConfirm = () => {
  emit("update:modelValue", selected.value); //更新v-model绑定的值
  emit("change", selected.value);
};

//点击取消按钮
const handleCancel = () => {
  selected.value = []; //清空所选值
  emit("update:modelValue", selected.value); //更新v-model绑定的值
  emit("change", selected.value);
};
</script>

<style lang="scss" scoped>
.el-select-dropdown {
  .check-all {
    padding: 0 32px 0 20px;
  }
  .operation-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    box-sizing: border-box;
  }
  //select后面的勾去掉
  .el-select-dropdown__item.selected {
    &::after {
      display: none;
    }
  }
}
.list-checkbox {
  //   display: flex;
  //   flex-direction: column;
}
::v-deep(.el-select-dropdown__wrap) {
  height: auto;
}
</style>
