<template>
  <view class="title"> 发布订单 </view>
  <wd-form ref="form" :model="model">
    <wd-cell-group border>
      <wd-input label="用户名" label-width="100px" prop="name" clearable v-model="model.washId" placeholder="请输入ID" />

      <wd-input label="地点" label-width="100px" prop="name" clearable v-model="model.location" placeholder="请输入地点" />

      <wd-input label="联系方式" label-width="100px" prop="name" clearable v-model="model.phoneNumber"
        placeholder="请输入联系方式" />

      <wd-input label="西装数量" label-width="100px" clearable v-model="model.suitNumber" />

      <wd-input label="皮衣数量" label-width="100px" clearable v-model="model.leatherNumber" />

      <wd-input label="棉衣数量" label-width="100px" clearable v-model="model.cottonNumber" />

      <wd-input label="化纤数量" label-width="100px" clearable v-model="model.syntheticNumber" />

      <view class="footer">
        <wd-button type="primary" @click="submit"> 提交 </wd-button>
      </view>
    </wd-cell-group>
  </wd-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";

const CLOTHE_TYPE = ["西装", "皮衣", "棉衣", "化纤"];

const model = reactive<{
  washId: string;
  location: string;
  phoneNumber: number;
  suitNumber: number;
  leatherNumber: number;
  cottonNumber: number;
  syntheticNumber: number;
}>({
  washId: "",
  location: "",
  phoneNumber: 0,
  suitNumber: 0,
  leatherNumber: 0,
  cottonNumber: 0,
  syntheticNumber: 0,
});

const form = ref();


const submit = () => {
  form.value.validate().then(({ valid, errors }: any) => {
    if (valid) {
      // 通过
      console.log(model)
      const orderData = JSON.stringify(model)
      uni.request({
        url: 'https://42.202.37.75:17255/order/createOrder', //仅为示例，并非真实接口地址。
        data: {
          "userId": 6,
          "businessId": 0,
          "orderInfo": orderData
        },
        header: {
          'custom-header': 'hello' //自定义请求头信息
        },
        method: 'POST',
        success: (res) => {
          console.log(res.data);
        }
      });
    }
  });
};
</script>

<script lang="ts">
export default {
  options: {
    styleIsolation: "shared",
  },
};
</script>

<style scoped lang="scss">
.title {
  font-size: 24px;
  text-align: center;
  font-weight: 800;
  margin-bottom: 20px;
}

.add-button {}

.footer {
  width: 100%;
  text-align: center;
  height: 160px;

  :deep(.wd-button) {
    margin-top: 60px;
    width: 80%;
    height: 100%;
    margin-right: 12px;
    border-radius: 8px !important;
  }
}
</style>
