<template>
  <!-- 小程序不支持动态渲染 -->
  <template v-if="routeName === 'home'">
    <home :routeTo="routeTo"></home>
  </template>
  <template v-else-if="routeName === 'order-publish'">
    <orderPublish :routeTo="routeTo"></orderPublish>
  </template>
  <template v-else-if="routeName === 'order-list'">
    <orderList :routeTo="routeTo"></orderList>
  </template>
  <!-- <template v-else-if="routeName === 'order-payment'">
    <payment></payment>
  </template> -->
  <template v-else-if="routeName === 'profile'">
    <profile :routeTo="routeTo"></profile>
  </template>

  <template v-else>
    <notFound :routeTo="routeTo"></notFound>
  </template>
</template>

<script setup lang="ts">
import home from "./home/index.vue"; // 注意：通常组件名首字母大写
import orderPublish from "./order-publish/index.vue";
import orderList from "./order-list/index.vue";
import profile from "../../../components/profile/index.vue";
import notFound from "../../../components/404/index.vue";
import { onMounted, ref, toRefs } from "vue";

const props = defineProps<{
  routeName: string;
  routeTo: (name: string) => void;
}>();
const { routeName, routeTo } = toRefs(props);
const userInfo = ref<any>(null);

onMounted(() => {
  uni.getStorage({
    key: "userInfo",
    success: function (res) {
      userInfo.value = res.data;
    },
  });
});
</script>
