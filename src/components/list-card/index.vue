<template>
  <view class="card-wrapper">
    <wd-card type="rectangle">
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
              <view class="goods-info">
                <view class="goods-name">商品名字</view>
                <view class="goods-count">(x30)</view>
              </view>
              <view class="goods-price">1000元</view>
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
  </view>
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
.card-wrapper {
  width: 90vw;
  border-radius: 8px;

  :deep(.wd-card) {
    /* background-color: red; */
    border-radius: 12px;
  }
}

.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.content {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  .goods-list {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 4px;

    .goods-item {
      margin: 0 auto;
      width: 95%;
      background-color: #fff;
      display: flex;
      justify-content: space-between;
      padding: 8px;
      /* border-radius: 8px; */
      border-bottom: 1px solid #777e;

      .goods-info {
        display: flex;
        justify-content: start;
      }
    }
  }
}
</style>
