<template>
  <wd-swiper
    :list="swiperList"
    autoplay
    :current="0"
    @click="handleClick"
    @change="onChange"
  ></wd-swiper>

  <view class="buttons">
    <view class="main-buttons">
      <wd-button :round="false" block>主要按钮</wd-button>
    </view>

    <view class="sub-buttons">
      <view class="left">
        <wd-button :round="false" type="primary" plain>次要按钮</wd-button>
        <wd-button :round="false" type="primary" plain>次要按钮</wd-button>
      </view>

      <view class="right">
        <wd-button :round="false" type="primary" plain>次要按钮</wd-button>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";

const swiperList = ref([
  "https://unpkg.com/wot-design-uni-assets/redpanda.jpg",
  "https://unpkg.com/wot-design-uni-assets/capybara.jpg",
  "https://unpkg.com/wot-design-uni-assets/panda.jpg",
  "https://img.yzcdn.cn/vant/cat.jpeg",
  "https://unpkg.com/wot-design-uni-assets/meng.jpg",
]);

function handleClick(e) {
  console.log(e);
}
function onChange(e) {
  console.log(e);
}
</script>

<script lang="ts">
export default {
  options: {
    styleIsolation: "shared",
  },
};
</script>

<style lang="scss" scoped>
.buttons {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  .main-buttons {
    :deep(.wd-button) {
      height: 80px;
    }
  }

  .sub-buttons {
    height: 250px;
    display: flex;
    flex: 1;
    gap: 12px;
    :deep(.wd-button) {
      width: 100%;
    }

    .left {
      flex: 4;
      display: flex;
      flex-direction: column;
      gap: 12px;
      height: 100%;
      :deep(.wd-button) {
        width: 100%;
        height: 60px;
      }
    }

    .right {
      height: 100%;
      flex: 3;
      :deep(.wd-button) {
        height: 100%;
      }
    }
  }
}
</style>
