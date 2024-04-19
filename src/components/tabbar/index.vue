<template>
  <wd-tabbar v-model="tabbar">
    <wd-tabbar-item title="首页" icon="home"></wd-tabbar-item>
    <wd-tabbar-item title="发布订单" icon="add-circle"></wd-tabbar-item>
    <wd-tabbar-item title="我的" icon="user"></wd-tabbar-item>
  </wd-tabbar>
</template>

<script setup lang="ts">
import { ref } from "vue";

const tabbar = ref(1);
</script>

<style scoped></style>
