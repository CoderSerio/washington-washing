<template>
  <view class="page-wrapper">
    <view class="filter-wrapper">
      <wd-radio-group v-model="filterValue" shape="button">
        <template v-for="(item, key) in ORDER_STATUS" :key="item">
          <wd-radio :value="key" @click="filterValue = key">
            {{ item }}
          </wd-radio>
        </template>
      </wd-radio-group>
    </view>

    <view class="list-wrapper">
      <template v-for="(item, index) in listData.value" :key="index">
        <template v-if="+filterValue === 0 || +item.status === +filterValue">
          <listCard :info="item" :idInfo="idInfo.value"></listCard>
        </template>
      </template>
    </view>
  </view>
</template>

<script setup lang="ts">
import listCard from "../list-card/index.vue";
import { ref } from "vue";

const ORDER_STATUS = {
  0: "全部",
  10: "待接单",
  20: "待付款",
  30: "处理中",
  40: "已完成",
};

const data = [
  {
    clotheCount: [1, 0, 0, 0],
    location: "旧日都城大道一段114514号",
    time: "2024-04-20 11:11:11",
    status: 30,
    comment: "",
  },
  {
    clotheCount: [1, 0, 0, 0],
    location: "旧日都城大道一段114514号",
    time: "2024-04-20 12:11:11",
    status: 10,
    comment: "",
  },
  {
    clotheCount: [1, 0, 0, 0],
    location: "旧日都城大道一段114514号",
    time: "2024-04-20 13:11:11",
    status: 40,
    comment: "好啊好啊好啊",
  },
];

const filterValue = ref(0);
</script>

<script lang="ts">
import { request } from '@/components/request/request'
import { reactive } from 'vue'
const listData = reactive<any>({
  value: []
})
const idInfo = reactive<any>({
  value: {}
})
let userId: any = null
uni.getStorage({
  key: 'userInfo',
  success: function (res) {
    userId = res.data.userId;
  }
})
setInterval(() => {
  let temp: any = []
  request('/order/getOrder', 'GET', {}).then((res: any) => {
    res.data.filter((item: any) => {
      return item.userId === userId
    }).forEach((item: any) => {
      temp.push({ ...JSON.parse(item.orderInfo) })
      idInfo.value = { userId: item.userId, orderId: item.orderId, businessId: item.businessId }
    })
    listData.value = temp
  })
  console.log('订单', listData.value);
}, 5000)


export default {
  options: {
    styleIsolation: "shared",
  },
};
</script>

<style scoped lang="scss">
.page-wrapper {
  background-color: #eee;
  height: 90%;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-bottom: 80px;

  .filter-wrapper {
    margin: 10px 8px;
  }
}

:deep(.wd-radio-group) {
  background-color: #eee;
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  padding: 0 10px;
}
</style>
