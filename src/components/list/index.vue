<template>
  <view class="page-wrapper">
    <view class="filter-wrapper">
      <wd-radio-group v-model="filterValue" shape="button">
        <template v-for="(item, key) in ORDER_STATUS" :key="key">
          <wd-radio :value="key" @click="handleRadioClick(key)">
            {{ item }}
          </wd-radio>
        </template>
      </wd-radio-group>
    </view>

    <view class="list-wrapper">
      <template v-for="(item, index) in props.allOrderData" :key="item.orderId">
        <template
          v-if="
            [0, +(item?.status ?? item?.orderInfo?.status)].includes(
              +filterValue
            )
          "
        >
          <!-- 
          哪些卡片才渲染呢？
          用户：所有卡片都是本人才可见
          商家：待接单的全部可见，其余仅本人可见
        -->
          <template
            v-if="
              (type === 1 && userId === item.userId) ||
              (type === 2 && userId === item.businessId) ||
              (type === 2 && item.status === 10)
            "
          >
            <listCard
              :info="item"
              :idInfo="idInfo"
              :type="type"
              :refresh="props.refresh"
            ></listCard>
          </template>
        </template>
      </template>

      <view class="bottom">{{ props.isLoading ? "加载中..." : "到底了" }}</view>
    </view>
  </view>
</template>

<script setup lang="ts">
import listCard from "../list-card/index.vue";
import { ref, reactive, onMounted } from "vue";
import { request } from "@/components/request/request";
import { useToast } from "wot-design-uni";

const ORDER_STATUS = {
  0: "全部",
  10: "待接单",
  20: "待付款",
  30: "处理中",
  40: "已完成",
};

const props = defineProps<{
  allOrderData: Array<any>;
  refresh: () => void;
  isLoading: boolean;
}>();

const toast = useToast();

const filterValue = ref<any>("0");
// const listData = ref<Array<any>>([]);
const idInfo = reactive<any>({
  value: {},
});

let userId: any = ref<number>();
// 0 无效身份（请求中） 1 用户 2 商家
const type = ref<0 | 1 | 2>(0);

const handleRadioClick = (key: number) => {
  console.log(key);
  filterValue.value = key;
};

onMounted(() => {
  filterValue.value = "0";
  toast.loading("加载中...");
  uni.getStorage({
    key: "userInfo",
    success: function (res) {
      userId.value = res.data.userId;
      type.value = res.data.value3;
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
.page-wrapper {
  background-color: #eee;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 92vh;
  width: 100%;

  .filter-wrapper {
    /* margin: 10px 8px; */
    flex: 1;
  }

  .list-wrapper {
    /* height: 80vh; */
    overflow: auto;
    overflow-x: hidden;
    flex: 9;
    overflow-y: scroll;
  }
}

:deep(.wd-radio-group) {
  background-color: #eee;
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  padding: 0 10px;
}

.bottom {
  text-align: center;
  color: #3334;
}
</style>
