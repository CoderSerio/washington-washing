<template>
  <!-- 小程序不支持动态渲染 -->
  <template v-if="routeName === 'home'">
    <home></home>
  </template>
</template>

<script setup lang="ts">
import { ref } from "vue";
import home from "./home/index.vue"; // 注意：通常组件名首字母大写

const routeName = ref<string>("home"); // 确保这里的引用与组件名一致（大小写敏感）

const routeList: any = {
  home, // 注意：这里不需要reactive，因为我们只是简单地存储组件引用
};
</script>
