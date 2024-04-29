<template>
  <wd-swiper
    :list="swiperList"
    autoplay
    :current="0"
    @click="handleClick"
    @change="onChange"
  ></wd-swiper>

  <view class="buttons">
    <wd-button :round="false" @click="props.routeTo('order-publish')" block>
      开始洗衣
    </wd-button>

    <!-- <wd-button :round="false" type="error" plain> 活动公告 </wd-button> -->

    <wd-button
      :round="false"
      type="success"
      @click="props.routeTo('order-list')"
    >
      我的订单
    </wd-button>

    <wd-button
      plain
      :round="false"
      type="error"
      @click="props.routeTo('profile')"
    >
      个人主页
    </wd-button>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";

const swiperList = ref([
  "https://imgwcszq.soufunimg.com/699pic/201903/05/139/7666361f08cae4cc1fddb02e84b90934.jpg",
  "https://www.lijingganxi.com/static/upload/image/20211130/1638240445915510.jpg",
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
  gap: 16px;

  :deep(.wd-button) {
    height: 120px;
    width: 90%;
    font-size: 22px;
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
