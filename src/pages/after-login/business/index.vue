<template>
  <view class="business-wrapper">
    <template v-if="routeName === 'order-list'">
      <orderList :routeTo="routeTo"></orderList>
    </template>

    <template v-else-if="routeName === 'profile'">
      <profile></profile>
    </template>

    <template v-else>
      <notFound :routeTo="routeTo"></notFound>
    </template>
  </view>
</template>

<script setup lang="ts">
import orderList from "./order-list/index.vue";
import profile from "./profile/index.vue";
import notFound from "../../../components/404/index.vue";
import { onMounted } from "vue";

const { routeName, routeTo } = defineProps<{
  routeName: string;
  routeTo: (name: string) => void;
}>();

onMounted(() => {});
</script>

<style scoped>
.business-wrapper {
  height: 100%;
}
</style>
