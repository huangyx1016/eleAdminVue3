<template>
  <!-- 穿梭框组件简单使用 -->
  <div>
    <el-transfer
      v-model="transferValue"
      :data="data"
      filterable
      :filter-method="filterMethod"
      :format="{
        noChecked: '${total}',
        hasChecked: '${checked}/${total}',
      }"
      :titles="['Source', 'Target']"
      @left-check-change="handleLeftCheckChange"
      @right-check-change="handleRightCheckChange"
      @change="handleChange"
    />
    <div
      style="
        margin-top: 20px;
        width: 100px;
        height: 50px;
        background-color: dodgerblue;
        text-align: center;
        line-height: 50px;
        color: white;
        border-radius: 5px;
        cursor: pointer;
      "
      @click="handleClick"
      @dblclick="handleDblClick"
    >
      点击
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
//穿梭框组件源列表数据类型
interface Option {
  key: number;
  label: string;
  disabled: boolean;
}

//生成穿梭框源数据的方法
const generateData = () => {
  const data: Option[] = [];
  for (let i = 1; i <= 15; i++) {
    data.push({
      key: i,
      label: `Option ${i}`,
      disabled: i % 4 === 0,
    });
  }
  return data;
};

const data = ref<Option[]>(generateData()); //穿梭框组件的源数据
const transferValue = ref([]); //穿梭框绑定的数据
// const timer = ref(null);
let timer = null;

/**
 * @left-check-change="handleLeftCheckChange"
 * 左侧列表元素被用户选中 / 取消选中时触发
 * @param key1 当前被选中的元素的 key 数组
 * @param key2 选中状态发生变化的元素的 key 数组
 */
const handleLeftCheckChange = (key1, key2) => {
  console.log("handleLeftCheckChange");
  console.log("key1", key1);
  console.log("key2", key2);
};

/**
 * @right-check-change="handleRightCheckChange"
 * 右侧列表元素被用户选中 / 取消选中时触发
 * @param key1 当前被选中的元素的 key 数组
 * @param key2 选中状态发生变化的元素的 key 数组
 */
const handleRightCheckChange = (key1, key2) => {
  console.log("handleRightCheckChange");
  console.log("key1", key1);
  console.log("key2", key2);
};

/**
 *:filter-method="filterMethod"
 * 自定义搜索方法
 * @param query:当前关键字  item:每个数据项
 */
const filterMethod = (query, item) => {
  return item.label.includes(query);
};

/**
 * @change="handleChange"
 * 右侧列表元素变化时触发
 * @param value 当前值
 * @param direction 数据移动的方向 left||right
 * @param movedKeys 发生移动的数据key数组
 */
const handleChange = (
  value: number[] | string[],
  direction: "left" | "right",
  movedKeys: string[] | number[]
) => {
  console.log("handleChange");
  console.log("value", value);
  console.log("direction", direction); //left||right
  console.log("movedKeys", movedKeys);
};

//给同一个dom元素添加单击和双击事件
//单击事件
const handleClick = () => {
  clearTimeout(timer);
  timer = setTimeout(() => {
    console.log("单击事件");
  }, 400);
  // console.log("单击事件");
};
//双击事件
const handleDblClick = () => {
  clearTimeout(timer);
  console.log("双击事件");
};

//js sort()方法的使用 可以对数组进行排序
const arr = [1, 6, 3, 2, 8];
arr.sort((a, b) => a - b); //升序/从小到大排
console.log("arr", arr);
const arr2 = [1, 2, 5, 12, 34, 33, 90];
arr2.sort((a, b) => b - a); //降序/从大到小排
console.log("arr2", arr2);
arr2.unshift(0); //js unshift()往数组开头添加一个到多个元素
arr2.unshift(99);
console.log("arr2", arr2);
arr2.sort((a, b) => a - b);
console.log("arr2", arr2);

//js中一些常用的数组方法  https://blog.csdn.net/web2022050903/article/details/127073445
//js中会改变原数组的数组方法
//1、push() 数组末尾添加元素  返回数组的长度
//2、unshift() 数组开头添加一个或多个元素  返回数组新的长度
//3、pop() 从数组中删除最后一个元素 并返回该元素的值
//4、shift() 从数组中删除第一个元素，并返回该元素的值。
//5、sort()  用原地算法对数组的元素进行排序，并返回数组
//6、splice() 用于添加或删除数组中的元素，如果删除一个元素，则返回一个元素的数组。 如果未删除任何元素，则返回空数组。
//7、reverse() 用于颠倒数组中元素的顺序。

//js中不会改变原数组的数组方法
//1、concat() 用于连接两个或多个数组。该方法不会改变现有的数组，而仅仅会返回被连接数组的一个副本。
//2、join() 用于把数组中的所有元素转换一个字符串，元素是通过指定的分隔符进行分隔的。
//3、reduce() 接收一个函数作为累加器，数组中的每个值（从左到右）开始缩减，最终计算为一个值。
//4、map() 返回一个新数组，数组中的元素为原始数组元素调用函数处理后的值。
//5、forEach() 用于调用数组的每个元素，并将元素传递给回调函数。
//6、filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。
//7、slice() 方法可从已有的数组中返回选定的元素。slice() 方法可提取字符串的某个部分，并以新的字符串返回被提取的部分。
//8、findIndex() 接收一个测试函数，也可以叫做条件函数，最终返回满足该测试函数的元素的索引位置，如果没有找到符合条件的元素，则返回-1。如果满足条件的有多个，那么只会返回第一个满足条件的元素索引。

onMounted(() => {
  //vue3 获取路由页面跳转时携带参数的写法  const route = useRoute();
  let queryId = route.query.id; //获取query方式路由跳转的参数
  console.log("queryId", queryId);
  let paramsId = route.params.id; //获取params路由跳转携带的参数时需要在 路由index文件里面的路径后面加上:id 否则会undefined,动态路由
  console.log("paramsId", paramsId);
});
</script>

<style lang="scss" scoped>
.wrap {
  display: flex;
  .left {
    width: 200px;
    height: 500px;
    .list-item {
      width: 100%;
      height: 50px;
      text-align: center;
      line-height: 50px;
      border: 1px solid black;
    }
  }
  .right {
    width: 200px;
    height: 500px;
    .list-item {
      width: 100%;
      height: 50px;
      text-align: center;
      line-height: 50px;
      border: 1px solid black;
    }
  }
}
</style>
