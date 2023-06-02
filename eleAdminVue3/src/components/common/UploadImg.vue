<template>
  <el-upload
    class="avatar-uploader"
    action="/"
    accept="image/png, image/jpeg, image/jpg"
    :http-request="httpRequest"
    :show-file-list="false"
  >
    <img
      v-if="imgurl"
      :src="imgurl"
      class="avatar"
      style="border: 1px dashed #d9d9d9"
    />
    <i
      v-else
      class="el-icon-plus avatar-uploader-icon"
      style="border: 1px dashed #d9d9d9"
    ></i>
  </el-upload>
</template>
<script lang="ts" setup>
import { ElMessage } from "element-plus";
import type { UploadRequestOptions } from "element-plus";
const props = defineProps({
  imgurl: {
    type: String,
    default: "",
  },
});
const httpRequest = (options: UploadRequestOptions) => {
  // 获取文件对象
  console.log("options", options);
  let file = options.file;
  console.log("file", file);
  // 判断是否符合图片格式
  var typeArr = ["image/jpeg", "image/png", "image/JPG"];
  if (typeArr.indexOf(file.type) == -1) {
    ElMessage.error("上传图片只能是 JPG/PNG/JPEG 格式!");
    return;
  }
  // 判断图片大小
  if (file.size / 1024 / 1024 > 2) {
    ElMessage.error("上传图片大小不能超过 2MB!");
    return;
  }
  // FormData 对象
  var formData = new FormData();
  // 文件对象
  formData.append("file", file);
  console.log("formData", formData);
};
</script>
<style lang="scss" scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
