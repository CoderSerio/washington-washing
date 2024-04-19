<template>
  <input type="text" value="123" />
  <wd-button>主要按钮</wd-button>
  <wd-button type="success">成功按钮</wd-button>
  <wd-button type="info">信息按钮</wd-button>
  <wd-button type="warning">警告按钮</wd-button>
  <wd-button type="error">危险按钮</wd-button>
</template>

<script setup lang="ts">
import { onLoad } from "@dcloudio/uni-app";
import { ref } from "vue";
const title = ref("Hello");
onLoad(() => {
  console.log("onload");
});
</script>

<style></style>
