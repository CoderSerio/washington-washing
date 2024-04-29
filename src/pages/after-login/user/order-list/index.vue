<!-- 只显示自己的订单状态 -->
<template>
  <list :allOrderData="allOrderData" :refresh="refresh"></list>
</template>

<script setup lang="ts">
import list from "../../../../components/list/index.vue";

import { request } from "@/components/request/request";
import { onMounted, ref } from "vue";
import { useToast } from "wot-design-uni";
const toast = useToast();

const allOrderData = ref<Array<any>>([]);

const refresh = () => {
  toast.success("正在加载...");
  const timeId = setTimeout(() => {
    request("/order/getOrder", "GET", {}).then((res: any) => {
      allOrderData.value = res.data?.map((item: any) => {
        const data = {
          ...item,
          orderInfo: JSON.parse(item.orderInfo),
        };
        console.log("搞毛啊", data);
        return data;
      });
    });
    clearTimeout(timeId);
  }, 2000);
};

onMounted(() => {
  toast.loading("加载中...");
  refresh();
});
</script>

<style scoped lang="scss"></style>
