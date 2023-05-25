<template>
  <Teleport to="body">
    <div class="container"></div>
  </Teleport>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
</script>

<style lang="scss" scoped>
.container {
  width: 900px;
  height: 600px;
  border: 1px solid black;
}
</style>
