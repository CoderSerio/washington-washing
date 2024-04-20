<template>
  <!-- 小程序不支持动态渲染 -->
  <template v-if="routeName === 'home'">
    <home :routeTo="routeTo"></home>
  </template>
  <template v-else-if="routeName === 'order-publish'"> </template>
  <template v-else-if="routeName === 'order-list'"> </template>
  <template v-else-if="routeName === 'order-payment'"> </template>
  <template v-else-if="routeName === 'order-profile'"> </template>

  <template v-else>
    <notFound :routeTo="routeTo"></notFound>
  </template>
</template>

<script setup lang="ts">
import { ref } from "vue";
import home from "./home/index.vue"; // 注意：通常组件名首字母大写
import notFound from "../../../components/404/index.vue";

const routeName = ref<string>("home"); // 确保这里的引用与组件名一致（大小写敏感）
const routeTo = ref((name: string) => {
  routeName.value = name;
});
</script>
