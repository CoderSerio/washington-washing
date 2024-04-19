<template>
  <view class="page-wrapper">
    <view class="title">WASH 洗衣</view>
    <view class="buttons">
      <wd-button block type="primary" @click="step = 'account-login'">
        WASH 账号登录
      </wd-button>
      <wd-button block type="success" @click="step = 'weixin-login'">
        微信登录
      </wd-button>
      <wd-button block type="info" @click="step = 'register'"> 注册 </wd-button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { onLoad } from "@dcloudio/uni-app";
import { ref } from "vue";

onLoad(() => {
  console.log("onload");
});

type Step = "init" | "account-login" | "weixin-login" | "register" | "binding";
const step = ref<Step>("init");
const checkItems = ref({
  isWeixinBinding: false,
  isWashAccountBinding: false,
});
const changeStep = (name: Step) => {
  step.value = name;
};
</script>

<script lang="ts">
export default {
  options: {
    styleIsolation: "shared",
  },
};
</script>

<style lang="scss" scoped>
.page-wrapper {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .title {
    flex: 1;
    display: flex;
    align-items: center;
    font-size: 32px;
  }
  .buttons {
    width: 100%;
    flex: 3;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;

    :deep(.wd-button) {
      height: 48px;
      width: 80%;
    }
  }
}
</style>
