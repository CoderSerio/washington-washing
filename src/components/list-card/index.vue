<template>
  <view class="card-wrapper">
    <wd-card type="rectangle">
      <template #title>
        <view class="header">
          <view class="time">2020-02-03</view>
          <!-- TODO: 加个颜色 -->
          <view class="status">{{ ORDER_STATUS[`${info.status}`] }}</view>
        </view>
      </template>

      <view class="content">
        <view class="goods-list">
          <template v-for="(cnt, index) in info.clotheCount" :key="index">
            <template v-if="cnt > 0">
              <view
                class="goods-item"
                style="color: rgba(0, 0, 0, 0.85); font-size: 16px"
              >
                <view class="goods-info">
                  <view class="goods-name">{{ CLOTHE_TYPE[index] }}</view>
                  <view class="goods-count"> (x{{ cnt }}) </view>
                </view>
                <view class="goods-price">1000元</view>
              </view>
            </template>
          </template>
        </view>
        <view class="location">地址：{{ info.location }}</view>
      </view>

      <template #footer>
        <view class="footer">
          <view class="total-price">总计: 1160元</view>
          <view class="buttons">
            <wd-button size="small" style="margin-right: 8px">评价</wd-button>
            <wd-button size="small" plain>立即支付</wd-button>
          </view>
        </view>
      </template>
    </wd-card>
  </view>
</template>

<script setup lang="ts">
// TODO：要请求商家报价列表
import { ref } from "vue";
const CLOTHE_TYPE = ["西装", "皮衣", "棉衣", "化纤"];
const ORDER_STATUS = {
  0: "全部",
  10: "待接单",
  20: "待付款",
  30: "处理中",
  40: "已完成",
};

const { info } = defineProps<{
  info: {
    clotheCount: Array<number>;
    location: string;
    time: string;
    status: number;
    comment: string;
  };
}>();
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
  flex-direction: column;
  justify-content: flex-start;
  /* align-items: center; */

  .location {
    word-break: break-word;
    overflow-wrap: break-word;
    white-space: normal;
  }
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

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .total-price {
    font-size: 16px;
    font-weight: 800;
    color: #ff3700;
  }
}
</style>
