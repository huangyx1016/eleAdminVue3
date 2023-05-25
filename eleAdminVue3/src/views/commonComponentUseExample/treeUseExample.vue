<template>
  <el-tree
    :data="treeData"
    :props="defaultProps"
    show-checkbox
    accordion
    check-strictly
    @node-click="handleNodeClick"
    @check-change="handleCheckChange"
  />
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
interface Tree {
  label: string;
  children?: Tree[];
}
const defaultProps = {
  children: "children",
  label: "label",
};
const treeData = ref([
  {
    id: 1,
    label: "福建省",
    children: [
      {
        id: 2,
        label: "福州市",
        children: [
          {
            id: 11,
            label: "福州组织1",
          },
          {
            id: 12,
            label: "福州组织2",
          },
        ],
      },
      {
        id: 3,
        label: "莆田市",
      },
      {
        id: 4,
        label: "三明市",
      },
      {
        id: 5,
        label: "泉州市",
      },
      {
        id: 6,
        label: "漳州市",
      },
      {
        id: 7,
        label: "南平市",
      },
      {
        id: 8,
        label: "龙岩市",
      },
      {
        id: 9,
        label: "宁德市",
      },
      {
        id: 10,
        label: "厦门市",
        children: [
          {
            id: 13,
            label: "厦门组织1",
          },
          {
            id: 14,
            label: "厦门组织2",
          },
          {
            id: 15,
            label: "厦门组织3",
          },
        ],
      },
    ],
  },
]);
const handleNodeClick = (data: Tree) => {
  console.log("data", data);
};
/**
 * 共三个参数
 * @param data 传递给 data 属性的数组中该节点所对应的对象
 * @param checked 节点本身是否被选中
 * @param indeterminate 节点的子树中是否有被选中的节点
 */
const handleCheckChange = (
  data: Tree,
  checked: boolean,
  indeterminate: boolean
) => {
  console.log("data", data);
  console.log("checked", checked);
  console.log("indeterminate", indeterminate);
};
</script>

<style lang="scss" scoped></style>
