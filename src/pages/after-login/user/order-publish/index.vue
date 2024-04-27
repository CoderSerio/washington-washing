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
  <wd-toast />
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { request } from '@/components/request/request'
import { useToast } from 'wot-design-uni'

const toast = useToast()
const CLOTHE_TYPE = ["西装", "皮衣", "棉衣", "化纤"];
const props = defineProps<{
  routeTo: (name: string) => void
}>()
const model = reactive<{
  clotheCount: Array<number>;
  washId: string;
  location: string;
  phoneNumber: number;
  suitNumber: number;
  leatherNumber: number;
  cottonNumber: number;
  syntheticNumber: number;
  status: number;
  comment: string;
}>({
  washId: "",
  clotheCount: [],
  location: "",
  phoneNumber: 0,
  suitNumber: 0,
  leatherNumber: 0,
  cottonNumber: 0,
  syntheticNumber: 0,
  status: 10,
  comment: ''
});

const form = ref();


const submit = () => {
  toast.loading('加载中...')
  form.value.validate().then(({ valid, errors }: any) => {
    if (valid) {
      // 通过
      model.clotheCount[0] = Number(model.suitNumber);
      model.clotheCount[1] = Number(model.leatherNumber);
      model.clotheCount[2] = Number(model.cottonNumber);
      model.clotheCount[3] = Number(model.syntheticNumber);
      const orderData = JSON.stringify(model)
      uni.getStorage({
        key: 'userInfo',
        success: function (res) {
          console.log(res.data);
          const data = {
            "userId": res.data.userId,
            "businessId": 0,
            "orderInfo": orderData
          }
          request('/order/createOrder', 'POST', data).then((res) => {
            toast.success("添加成功")
            setTimeout(() => {
              props.routeTo('home')
            }, 1000)
          })
        }
      })

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
