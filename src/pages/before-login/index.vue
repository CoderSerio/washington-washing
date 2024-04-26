<template>
  <view class="page-wrapper">
    <template v-if="step === 'init'">
      <init :changeStep="changeStep"></init>
    </template>

    <template v-else-if="step === 'account-login'">
      <accountLogin :changeStep="changeStep"></accountLogin>
    </template>

    <template v-else-if="step === 'register'">
      <register :changeStep="changeStep"></register>
    </template>
  </view>
</template>

<script setup lang="ts">
import { onLoad } from "@dcloudio/uni-app";
import { ref } from "vue";
import init from "./init/index.vue";
import register from "./register/index.vue";
import accountLogin from "./wash-account-login/index.vue";

onLoad(() => {
  console.log("onload");
});

type Step = "init" | "account-login" | "weixin-login" | "register" | "binding";
const step = ref<Step>("init");
const checkItems = ref({
  isWeixinBinding: false,
  isWashAccountBinding: false,
});
const changeStep = (name: string) => {
  step.value = name as Step;
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
