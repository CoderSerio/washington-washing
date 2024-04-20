<template>
  <view class="page-wrapper">
    <view class="title">WASH 洗衣</view>

    <view class="buttons">
      <wd-button
        block
        type="primary"
        @click="props.changeStep('account-login')"
      >
        WASH 账号登录
      </wd-button>
      <wd-button block type="success" @click=""> 微信登录 </wd-button>
      <wd-button block type="info" @click="props.changeStep('register')">
        注册
      </wd-button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { onLoad } from "@dcloudio/uni-app";
import { ref } from "vue";

const props = defineProps<{
  changeStep: (step: string) => void;
}>();

onLoad(() => {
  console.log("onload");
});
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
