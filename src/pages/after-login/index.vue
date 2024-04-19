<template>
  <template v-if="level === 1">
    <user></user>
  </template>
  <template v-else>
    <business></business>
  </template>
</template>

<script setup lang="ts">
import user from "./user/index.vue";
import business from "./business/index.vue";
import { onMounted, ref } from "vue";
const title = ref("Hello");

// 1用户、2商家
const level = ref(1);

onMounted(() => {
  level.value = 1;
  // TODO: 获取到底是商家还是用户，估计得搞一个全局状态管理
});
</script>

<style></style>
