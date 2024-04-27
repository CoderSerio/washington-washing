<template>
  <view class="card-wrapper">
    <wd-card type="rectangle">
      <template #title>
        <view class="header">
          <view class="time">2020-02-03</view>
          <!-- TODO: 加个颜色 -->
          <view class="status">{{
            ORDER_STATUS[`${info?.orderInfo?.status}`] ?? "未知"
          }}</view>
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

      <payment
        @handlePayment="handlePayment"
        :show="showPayment"
        :setShow="setShowPayment"
      />
      <wd-overlay :show="show">
        <div class="comment">
          <wd-input
            type="text"
            v-model="comment"
            placeholder="请输入评价内容"
          />
          <wd-button size="small" @click="handleComment">确认评价</wd-button>
        </div>
      </wd-overlay>

      <template #footer>
        <view class="footer">
          <view class="total-price">总计: 1160元</view>
          <view class="buttons">
            <!-- <view class="status-test">
              {{ info.orderInfo }}
            </view> -->
            <!-- 接单：status 待接单 && 商家-->
            <template v-if="info.orderInfo.status === 10 && props.type === 2">
              <wd-button
                size="small"
                style="margin-right: 8px"
                type="info"
                @click="show = true"
              >
                接单
              </wd-button>
            </template>

            <!-- 支付： status 待支付 && 用户 -->
            <template
              v-else-if="info.orderInfo.status === 20 && props.type === 1"
            >
              <wd-button
                size="small"
                style="margin-right: 8px"
                type="info"
                @click="showPayment = true"
              >
                立即支付
              </wd-button>
            </template>

            <!-- 确认完成: status 处理中 && 商家 -->
            <template
              v-else-if="info.orderInfo.status === 30 && props.type === 2"
            >
              <wd-button
                size="small"
                style="margin-right: 8px"
                type="info"
                @click="showPayment = true"
              >
                确认完成
              </wd-button>
            </template>

            <!-- 评价：status 已完成 && 用户 -->
            <template
              v-else-if="info.orderInfo.status === 40 && props.type === 1"
            >
              <template v-if="info.comment === ''">
                <wd-button
                  size="small"
                  style="margin-right: 8px"
                  type="info"
                  @click="show = true"
                >
                  评价
                </wd-button>
              </template>
              <template v-else>
                <view class="comment">
                  {{ info.comment }}
                </view>
              </template>
            </template>
          </view>
        </view>
      </template>
    </wd-card>
  </view>

  <wd-toast />
</template>

<script setup lang="ts">
// TODO：要请求商家报价列表
import { reactive, ref, toRefs } from "vue";
import { request } from "../../components/request/request";
import { useToast } from "wot-design-uni";
import payment from "@/pages/after-login/user/payment/index.vue";
const toast = useToast();
const CLOTHE_TYPE = ["西装", "皮衣", "棉衣", "化纤"];
const show = ref(false);
const comment = ref("");
const ORDER_STATUS = {
  0: "全部",
  10: "待接单",
  20: "待付款",
  30: "处理中",
  40: "已完成",
};
const showPayment = ref<boolean>(false);

const props = defineProps<{
  info: any;
  idInfo: {
    orderId: number;
    userId: number;
    businessId: number;
  };
  type: 0 | 1 | 2;
}>();
const { info, idInfo } = toRefs(props);

console.log("订单信息", info, idInfo);

const setShowPayment = (flag: boolean) => {
  showPayment.value = flag;
};

function handlePayment() {
  const data = {
    businessId: idInfo.value.businessId,
    orderId: idInfo.value.orderId,
    orderInfo: JSON.stringify({ ...info.value, status: 30 }),
    userId: idInfo.value.userId,
  };
  console.log(999, data, JSON.stringify({ ...info.value, status: 30 }));
  request("/order/setOrderInfo", "POST", data).then((res) => {
    toast.success("支付成功");
    console.log("支付成功", res);
  });
}
function handleComment() {
  const data = {
    businessId: idInfo.value.businessId,
    orderId: idInfo.value.orderId,
    orderInfo: JSON.stringify({ ...info.value, comment: comment.value }),
    userId: idInfo.value.userId,
  };
  console.log(999, data);
  request("/order/setOrderInfo", "POST", data).then((res) => {
    toast.success("评论成功");
    console.log("评论成功", res);
    show.value = false;
  });
}
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

.comment {
  position: fix;
  margin-top: 50%;
  display: flex;
  gap: 30px;
  padding: 10px;
  height: 100px;
  justify-content: center;
  align-items: center;
  background-color: #fff;
}

.buttons {
  width: 200px;
  height: 32px;
  gap: 10px;
  text-align: right;
}

/* .status-test {
  height: 100%;
  width: 100%;
  background-color: red;
} */
</style>
