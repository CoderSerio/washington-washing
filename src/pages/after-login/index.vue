<template>
  <template v-if="level === 1">
    <user :routeName="routeName" :routeTo="routeTo"></user>
  </template>
  <template v-else>
    <business :routeName="routeName" :routeTo="routeTo"></business>
  </template>
  <view class="tabbar">
    <tabbar
      :dataList="dataList"
      :routeName="routeName"
      :routeTo="routeTo"
    ></tabbar>
  </view>
</template>

<script setup lang="ts">
import user from "./user/index.vue";
import business from "./business/index.vue";
import { onMounted, ref } from "vue";
import tabbar from "../../components/tabbar/index.vue";

// 1用户、2商家
const level = ref(1);
const routeName = ref<string>("home"); // 确保这里的引用与组件名一致（大小写敏感）
const routeTo = (name: string) => {
  routeName.value = name;
  console.log("routeName.value", routeName.value);
};
const dataList = [
  { title: "首页", icon: "home", route: "home" },
  { title: "发布订单", icon: "add-circle", route: "order-publish" },
  { title: "我的", icon: "user", route: "profile" },
];

onMounted(() => {
  level.value = 1;
});
</script>

<style scoped>
.tabbar {
  position: fixed;
  bottom: 0;
  width: 100%;
}
</style>
