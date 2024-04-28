<template>
  <view class="title"> 服务定价 </view>
  <wd-form ref="form" :model="model">
    <wd-cell-group border>
      <wd-input
        label="西装价格"
        label-width="100px"
        clearable
        v-model="model.suitNumber"
      />

      <wd-input
        label="皮衣价格"
        label-width="100px"
        clearable
        v-model="model.leatherNumber"
      />

      <wd-input
        label="棉衣价格"
        label-width="100px"
        clearable
        v-model="model.cottonNumber"
      />

      <wd-input
        label="化纤价格"
        label-width="100px"
        clearable
        v-model="model.syntheticNumber"
      />

      <view class="footer">
        <wd-button type="primary" @click="submit"> 提交 </wd-button>
      </view>
    </wd-cell-group>
  </wd-form>
  <wd-toast />
</template>

<script lang="ts" setup>
import { request } from "@/components/request/request";
import { onMounted, reactive, ref } from "vue";
import { useToast } from "wot-design-uni";

const toast = useToast();
const CLOTHE_TYPE = ["西装", "皮衣", "棉衣", "化纤"];
const props = defineProps<{
  routeTo: (name: string) => void;
}>();
const model = reactive<any>({
  price: [],
  suitNumber: 10,
  leatherNumber: 10,
  cottonNumber: 10,
  syntheticNumber: 10,
});

const form = ref();

const submit = () => {
  form.value.validate().then(({ valid, errors }: any) => {
    if (valid) {
      model.price[0] = Number(model.suitNumber);
      model.price[1] = Number(model.leatherNumber);
      model.price[2] = Number(model.cottonNumber);
      model.price[3] = Number(model.syntheticNumber);

      uni.getStorage({
        key: "userInfo",
        success: function (res) {
          const userInfo = res.data;
          const userId = userInfo.userId;
          const type = userInfo.type;
          const wxInfo = userInfo.wxInfo;
          const washInfoObj = JSON.parse(userInfo.washInfo);

          console.log("userInfo", userInfo);

          const newLocalStorageUserInfo = {
            ...res.data,
            price: model.price,
          };

          uni.setStorage({
            key: "userInfo",
            data: newLocalStorageUserInfo,
          });

          const data = {
            userId,
            type,
            wxInfo,
            washInfo: JSON.stringify({
              ...washInfoObj,
              price: model.price,
            }),
          };

          request("/user/setUserInfo", "POST", data).then((res) => {
            toast.success("");
            console.log("修改成功", res);
            props.routeTo("profile");
          });
        },
      });
    }
  });
};

onMounted(() => {});
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
