<template>
  <wd-card custom-class="card" type="rectangle">
    <template #title>
      <view class="header">
        <view class="time">2020-02-03</view>
        <view class="status">已完成</view>
      </view>
    </template>

    <view class="content">
      <view class="goods-list">
        <template v-for="(item, index) in 4" :key="index">
          <view
            class="goods-item"
            style="color: rgba(0, 0, 0, 0.85); font-size: 16px"
          >
            <view class="goods-name">商品1</view>
            <view class="goods-number">
              <view class="goods-count">100件</view>
              <view class="goods-price">1000元</view>
            </view>
          </view>
        </template>
      </view>
    </view>

    <template #footer>
      <view>
        <wd-button size="small" style="margin-right: 8px">评价</wd-button>
        <wd-button size="small" plain>立即支付</wd-button>
      </view>
    </template>
  </wd-card>
</template>

<script setup lang="ts">
const CLOTHE_TYPE = ["西装", "皮衣", "棉衣", "化纤"];

const data = {
  clotheCount: [1, 0, 0, 0],
  location: "旧日都城大道一段114514号",
  time: "2024-04-20",
  status: 10,
  comment: "",
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
.content,
.title {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
.content {
  justify-content: flex-start;
}
.title {
  justify-content: space-between;
}
.title-tip {
  color: rgba(0, 0, 0, 0.25);
  font-size: 12px;
}
</style>
