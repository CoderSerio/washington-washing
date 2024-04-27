<!-- 只显示自己的订单状态 -->
<template>
  <list :allOrderData="allOrderData"></list>
</template>

<script setup lang="ts">
import { request } from "@/components/request/request";
import { onMounted, ref } from "vue";
import list from "../../../../components/list/index.vue";

const allOrderData = ref<Array<any>>([]);

onMounted(() => {
  request("/order/getOrder", "GET", {}).then((res: any) => {
    allOrderData.value = res.data?.map((item: any) => {
      const data = {
        ...item,
        orderInfo: JSON.parse(item.orderInfo),
      };
      console.log("res", data);
      return data;
    });
  });
});
</script>

<style scoped lang="scss"></style>
