<template>
  <template>
    <view class="card-wrapper">
      <wd-card type="rectangle">
        <template #title>
          <view class="header">
            <view class="time">{{ info?.orderInfo?.date ?? "" }}</view>
            <!-- TODO: 加个颜色 -->
            <view
              class="status"
              :style="{
                color:
                  STATUS_COLOR[`${info?.status || info?.orderInfo?.status}`],
              }"
            >
              {{
                ORDER_STATUS[`${info?.status || info?.orderInfo?.status}`] ??
                "未知"
              }}
            </view>
          </view>
        </template>

        <view class="content">
          <view class="goods-list">
            <template
              v-for="(cnt, index) in info.orderInfo.clotheCount"
              :key="index"
            >
              <template v-if="cnt > 0">
                <view
                  class="goods-item"
                  style="color: rgba(0, 0, 0, 0.85); font-size: 16px"
                >
                  <view class="goods-info">
                    <view class="goods-name">{{ CLOTHE_TYPE[index] }}</view>
                    <view class="goods-count"> (x{{ cnt }}) </view>
                  </view>
                  <view class="goods-price">
                    {{
                      info?.price?.[index] ??
                      (props?.type == 2 ||
                      (info?.status ?? info.orderInfo.status) > 10
                        ? info.orderInfo?.clotheCount?.[index] ??
                          0 * userInfo?.price?.[index] ??
                          0 ??
                          "--"
                        : "--")
                    }}元
                  </view>
                </view>
              </template>
            </template>
          </view>
          <view class="location"
            >地址：{{ info.orderInfo?.location ?? "" }}</view
          >
        </view>

        <payment
          @handlePayment="handlePayment"
          :show="showPayment"
          :setShow="setShowPayment"
          :price="info.totalPrice"
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
            <view class="total-price">
              总计:{{
                info?.totalPrice ??
                (props?.type == 2 ||
                (info?.status ?? info.orderInfo.status) > 10
                  ? sum()
                  : "--")
              }}元
            </view>
            <view class="buttons">
              <!-- 接单：status 待接单 && 商家-->
              <template v-if="info.status === 10 && props.type === 2">
                <wd-button
                  size="small"
                  style="margin-right: 8px"
                  type="info"
                  @click="deal"
                >
                  接单
                </wd-button>
              </template>

              <!-- 支付： status 待支付 && 用户 -->
              <template v-else-if="info.status === 20 && props.type === 1">
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
              <template v-else-if="info.status === 30 && props.type === 2">
                <wd-button
                  size="small"
                  style="margin-right: 8px"
                  type="info"
                  @click="confirmFinish"
                >
                  确认完成
                </wd-button>
              </template>

              <!-- 评价：status 已完成 && 用户 -->

              <template v-else-if="info.status === 40">
                <template
                  v-if="
                    info.comment === '' &&
                    info.orderInfo.comment === '' &&
                    props.type === 1
                  "
                >
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
                    {{ info.comment || info.orderInfo.comment }}
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
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, toRefs } from "vue";
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
const STATUS_COLOR = {
  10: "skyblue",
  20: "#ff3700",
  30: "lightgreen",
  40: "gray",
};

const showPayment = ref<boolean>(false);
const userInfo = ref<any>(null);

const safe = (num: number) => {
  return num ?? 0;
};

const sum = () => {
  const count = info.value?.orderInfo?.clotheCount;
  const price = userInfo.value?.price;

  let sum = 0;
  count.forEach((cnt: number, index: number) => {
    const sCnt = safe(cnt);
    const sPrice = safe(price?.[index]);
    console.log(sCnt, sPrice);
    sum += sCnt * sPrice;
  });

  return sum;
};

const props = defineProps<{
  info: any;
  idInfo: {
    orderId: number;
    userId: number;
    businessId: number;
  };
  type: 0 | 1 | 2;
  refresh: () => void;
}>();

const { info, idInfo } = toRefs(props);
console.log("info", info);

console.log("订单信息", info, idInfo);

const setShowPayment = (flag: boolean) => {
  showPayment.value = flag;
};

function handlePayment() {
  const data = {
    businessId: info.value.businessId,
    orderId: info.value.orderId,
    userId: userInfo.value.userId,
    orderInfo: JSON.stringify({ ...info.value, status: 30 }),
  };
  request("/order/setOrderInfo", "POST", data).then((res) => {
    showPayment.value = false;
    props.refresh();
    toast.success("支付成功");
  });
}
function handleComment() {
  const data = {
    businessId: info.value.businessId,
    orderId: info.value.orderId,
    userId: userInfo.value.userId,
    orderInfo: JSON.stringify({ ...info.value, comment: comment.value }),
  };
  request("/order/setOrderInfo", "POST", data).then((res) => {
    show.value = false;
    props.refresh();
    toast.success("评论成功，将在审核通过后展示");
  });
}
function confirmFinish() {
  const data = {
    businessId: info.value.businessId,
    orderId: info.value.orderId,
    orderInfo: JSON.stringify({ ...info.value, status: 40 }),
    userId: info.value.userId,
  };

  request("/order/setOrderInfo", "POST", data).then((res) => {
    props.refresh();
    toast.success("操作成功");
  });
}
// 接单
function deal() {
  uni.getStorage({
    key: "userInfo",
    success: function (res) {
      userInfo.value = res.data;
      const price = userInfo.value?.price ?? [10, 10, 10, 10];
      const computedPrice = price.map((p: number, index: number) => {
        return p * (info.value?.orderInfo?.clotheCount[index] ?? 0);
      }); // 单项的价格

      const data = {
        userId: info.value.userId,
        businessId: userInfo.value?.userId,
        orderId: info.value.orderId,
        orderInfo: JSON.stringify({
          ...info.value,
          status: 20,
          price: computedPrice,
          businessId: userInfo.value?.userId,
          totalPrice: computedPrice.reduce(
            (sum: number, i: number) => (sum += i),
            0
          ),
        }),
      };

      console.log("data", data);

      request("/order/setOrderInfo", "POST", data).then((res) => {
        toast.success("接单成功");
        props.refresh();
        console.log("res", res);
      });
    },
  });
}

onMounted(() => {
  uni.getStorage({
    key: "userInfo",
    success: function (res) {
      userInfo.value = res.data;
    },
  });
});
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
  padding-bottom: 20px;

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
  width: 220px;
  height: 320px;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis; //超出省略号
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
