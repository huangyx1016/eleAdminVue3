<template>
  <!-- 拖拽穿梭框 -->
  <div>
    <h3 style="text-align: center">拖拽穿梭框</h3>
    <div id="home" @mousemove="mousemove($event)">
      <div class="tree-select-content">
        <span
          class="select-content"
          :id="'mouse' + index"
          v-for="(item, index) in leftData"
          :key="item.id"
          @mousedown="mousedown(index, 1)"
          @mouseup="mouseup(item, 1, index)"
        >
          <span class="select-text">{{ item.label }}</span>
          <span class="select-text-X" @click="handleClickX(item, index, 1)"
            >X</span
          >
        </span>
      </div>
      <div class="tree-select-content">
        <span
          class="select-content"
          :id="'deleteMouse' + index"
          v-for="(item, index) in rightData"
          :key="item.id"
          @mousedown="mousedown(index, 2)"
          @mouseup="mouseup(item, 2, index)"
        >
          <span class="select-text">{{ item.label }}</span>
          <span class="select-text-X" @click="handleClickX(item, index, 2)"
            >X</span
          >
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, nextTick } from "vue";
const leftData = ref([
  { label: "首页", id: 1 },
  { label: "咨询", id: 2 },
  { label: "生活", id: 3 },
  { label: "财富", id: 4 },
  { label: "我的", id: 5 },
]);
const rightData = ref([{ label: "世界", id: 6 }]);
const isMoveTrue = ref(false);
const isMove = ref(false);
const moveId = ref("");

const mousedown = (index, val) => {
  isMoveTrue.value = true;
  if (val == 1) {
    moveId.value = "mouse" + index;
  } else {
    moveId.value = "deleteMouse" + index;
  }
};
const mousemove = (event) => {
  if (isMoveTrue) {
    isMove.value = true;
    document.getElementById(moveId.value).style.position = "absolute";
    document.getElementById(moveId.value).style.top = event.clientY + "px";
    document.getElementById(moveId.value).style.left = event.clientX + "px";
    document.getElementById(moveId.value).style.transform =
      "translate(-50%,-50%)";
  }
};
const mouseup = (item, val, index) => {
  if (!isMove.value) {
    isMoveTrue.value = false;
    moveId.value = "";
  }
  if (isMoveTrue.value && val == 2) {
    nextTick(() => {
      rightData.value.splice(index, 1);
      leftData.value.push(item);
    });
  } else if (isMoveTrue.value && val) {
    leftData.value.splice(index, 1);
    rightData.value.push(item);
  }
  document.getElementById(moveId.value).style.display = "none";
  isMoveTrue.value = false;
  isMove.value = false;
  moveId.value = "";
};
const handleClickX = (item, index, val) => {
  if (val == 1) {
    leftData.value.splice(index, 1);
    rightData.value.push(item);
  } else {
    rightData.value.splice(index, 1);
    leftData.value.push(item);
  }
};
</script>

<style lang="scss" scoped>
#home {
  display: flex;
  justify-content: space-around;
}
.tree-select-content {
  width: 40%;
  height: 300px;
  background: #f9faff;
  border: 1px solid #dee0ec;
  border-radius: 4px;
  display: flex;
  flex-wrap: wrap;
  align-content: baseline;
}
.select-content {
  width: max-content;
  height: 20px;
  padding: 1.6%;
  border: 1px solid #d6dbed;
  margin: 2% 1% 0;
  background: #ffffff;
  box-shadow: 0 0 8px 0 rgba(72, 119, 236, 0.1);
  border-radius: 4px;
}
.select-content:hover span {
  color: #4877ec;
}
.select-content:hover {
  cursor: pointer;
  background: #f8faff;
  border: 1px solid #3e75f4;
}
.select-text {
  font-size: 15px;
  color: #2e2f36;
  text-align: center;
  font-weight: 400;
}
.select-text-X {
  font-size: 15px;
  color: #4877ec;
  letter-spacing: 0;
  font-weight: 400;
  margin-left: 12px;
  cursor: pointer;
}
</style>
