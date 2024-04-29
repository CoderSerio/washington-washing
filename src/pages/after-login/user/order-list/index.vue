<!-- 只显示自己的订单状态 -->
<template>
  <list
    :allOrderData="allOrderData"
    :refresh="refresh"
    :isLoading="isLoading"
  ></list>
</template>

<script setup lang="ts">
import list from "../../../../components/list/index.vue";

import { request } from "@/components/request/request";
import { onMounted, ref } from "vue";
import { useToast } from "wot-design-uni";
const toast = useToast();

const allOrderData = ref<Array<any>>([]);
const isLoading = ref(false);

const refresh = () => {
  isLoading.value = true;
  request("/order/getOrder", "GET", {})
    .then((res: any) => {
      allOrderData.value = res.data?.map((item: any) => {
        const info = JSON.parse(item.orderInfo);

        let data = {
          ...item,
        };

        if (info.orderInfo) {
          data = info;
        } else {
          data.orderInfo = info;
        }

        console.log("啥啊", data);

        return data;
      });
    })
    .finally(() => {
      isLoading.value = false;
    });
};

onMounted(() => {
  toast.loading("加载中...");
  refresh();
});
</script>

<style scoped lang="scss"></style>
