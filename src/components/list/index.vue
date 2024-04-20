<template>
  <view class="page-wrapper">
    <template v-for="(item, index) in data" :key="index">
      <listCard></listCard>
    </template>
  </view>
</template>

<script setup lang="ts">
const ORDER_STATUS = {
  10: "待接单",
  20: "待付款",
  30: "处理中",
  40: "已完成",
};
import listCard from "../list-card/index.vue";
const data = [{}, {}, {}];
</script>

<style scoped lang="scss">
.page-wrapper {
  background-color: #eee;
  height: 95vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}
</style>
