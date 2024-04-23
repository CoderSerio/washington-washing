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
      <wd-button :round="false" @click="props.routeTo('order-publish')" block>
        开始洗衣
      </wd-button>
    </view>

    <view class="sub-buttons">
      <view class="left">
        <wd-button :round="false" type="error" plain> 活动公告 </wd-button>
        <wd-button
          :round="false"
          type="error"
          @click="props.routeTo('profile')"
          plain
          >个人设置</wd-button
        >
      </view>

      <view class="right">
        <wd-button
          :round="false"
          type="success"
          @click="props.routeTo('order-list')"
        >
          我的订单
        </wd-button>
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

const props = defineProps<{
  routeTo: (name: string) => void;
}>();

function handleClick(e: any) {
  console.log(e);
}
function onChange(e: any) {
  console.log(e);
}

props.routeTo;
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
      height: 120px;
    }
  }

  .sub-buttons {
    height: 350px;
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
      height: 200px;
      :deep(.wd-button) {
        width: 100%;
        flex: 1;
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
