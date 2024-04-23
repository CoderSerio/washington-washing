<template>
  <view class="title"> 发布订单 </view>
  <wd-form ref="form" :model="model">
    <wd-cell-group border>
      <wd-input
        label="用户名"
        label-width="100px"
        prop="name"
        clearable
        v-model="model.washId"
        placeholder="请输入ID"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />

      <wd-input
        label="地点"
        label-width="100px"
        prop="name"
        clearable
        v-model="model.location"
        placeholder="请输入地点"
        :rules="[{ required: true, message: '请填写地点' }]"
      />

      <wd-input
        v-for="(item, index) in model.phoneNumbers"
        :key="item.key"
        label="联系方式"
        :prop="'phoneNumbers.' + index + '.value'"
        label-width="100px"
        clearable
        v-model="item.value"
        placeholder="联系方式"
        :rules="[{ required: true, message: '请填写联系方式' + index }]"
      />

      <wd-input
        label="西装数量"
        label-width="100px"
        clearable
        v-model="model.suitNumber"
      />

      <wd-input
        label="皮衣数量"
        label-width="100px"
        clearable
        v-model="model.leatherNumber"
      />

      <wd-input
        label="棉衣数量"
        label-width="100px"
        clearable
        v-model="model.cottonNumber"
      />

      <wd-input
        label="化纤数量"
        label-width="100px"
        clearable
        v-model="model.syntheticNumber"
      />

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
  phoneNumber: string;
  suitNumber: number;
  leatherNumber: number;
  cottonNumber: number;
  syntheticNumber: number;
}>({
  washId: "",
  location: "",
  phoneNumber: "",
  suitNumber: 0,
  leatherNumber: 0,
  cottonNumber: 0,
  syntheticNumber: 0,
});

const form = ref();

const addPhone = () => {
  model.phoneNumbers.push({
    key: Date.now(),
    value: "",
  });
};

const submit = () => {
  form.value.validate().then(({ valid, errors }) => {
    if (valid) {
      // 通过
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

.add-button {
}

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
