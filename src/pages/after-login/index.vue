<template>
  <template v-if="level === 1">
    <user :routeName="routeName" :routeTo="routeTo"></user>
  </template>
  <template v-else>
    <business :routeName="routeName" :routeTo="routeTo"></business>
  </template>
  <view class="tabbar">
    <tabbar
      :dataList="dataList"
      :routeName="routeName"
      :routeTo="routeTo"
    ></tabbar>
  </view>
</template>

<script setup lang="ts">
import user from "./user/index.vue";
import business from "./business/index.vue";
import { onMounted, ref } from "vue";
import tabbar from "../../components/tabbar/index.vue";
import { request } from "@/components/request/request";
import { onLoad } from "@dcloudio/uni-app";

// 1用户、2商家
const level = ref();
const routeName = ref<string>("home"); // 确保这里的引用与组件名一致（大小写敏感）
const routeTo = (name: string) => {
  routeName.value = name;
};
const dataList = ref<Array<any>>([]);
const allOrderList = ref<Array<any>>([]);

onLoad(() => {
  console.log("什么时候触发的");
  uni.getStorage({
    key: "userInfo",
    success: function (res) {
      console.log("res", res.data.value3);
      level.value = res.data.value3 || 1;
      let dataListValue;
      if (level.value === 1) {
        dataListValue = [
          { title: "首页", icon: "home", route: "home" },
          { title: "发布订单", icon: "add-circle", route: "order-publish" },
          { title: "我的", icon: "user", route: "profile" },
        ];
      } else {
        dataListValue = [
          { title: "订单池", icon: "home", route: "order-list" },
          { title: "服务设置", icon: "config", route: "config-info" },
          { title: "我的", icon: "user", route: "profile" },
        ];
      }
      console.log("什么东西啊", dataListValue);
      dataList.value = dataListValue;
      routeTo(dataList.value[0].route);
    },
  });
});
</script>

<style scoped>
.tabbar {
  position: fixed;
  bottom: 1px;
  width: 100%;
}
</style>
