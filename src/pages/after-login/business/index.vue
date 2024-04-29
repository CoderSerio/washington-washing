<template>
  <view class="business-wrapper">
    <template v-if="routeName === 'order-list'">
      <orderList :routeTo="routeTo"></orderList>
    </template>

    <template v-else-if="routeName === 'profile'">
      <profile :routeTo="routeTo"></profile>
    </template>

    <template v-else-if="routeName === 'config-info'">
      <configInfo :routeTo="routeTo"></configInfo>
    </template>

    <template v-else>
      <notFound :routeTo="routeTo"></notFound>
    </template>
  </view>
</template>

<script setup lang="ts">
import orderList from "./order-list/index.vue";
import profile from "../../../components/profile/index.vue";
import notFound from "../../../components/404/index.vue";
import configInfo from "./config-info/index.vue";
import { onMounted, ref } from "vue";

const { routeName, routeTo } = defineProps<{
  routeName: string;
  routeTo: (name: string) => void;
}>();

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

<style scoped>
.business-wrapper {
  height: calc(100% - 120px);
}
</style>
