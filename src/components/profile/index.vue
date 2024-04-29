<template>
  <div class="main">
    <div class="profile-contain">
      <div class="profile">
        <wd-img
          :width="80"
          :height="80"
          round
          mode="aspectFill"
          :src="imgUrl"
        />

        <div class="info">
          <div>
            {{ name || "获取用户名称失败" }}({{
              props.type === 1 ? "用户" : "商家"
            }})
          </div>
        </div>
      </div>
    </div>

    <view class="list">
      <template v-if="props.type === 2">
        <wd-button custom-class="list-item" @click="configureService">
          服务设置
        </wd-button>
      </template>
      <wd-button custom-class="list-item" @click="logout">注销登录</wd-button>
    </view>
  </div>
</template>

<script setup lang="ts">
import { onLoad } from "@dcloudio/uni-app";
import { onMounted, ref } from "vue";
import { useToast } from "wot-design-uni";
const name = ref<string>("我是xxx");
const phone = ref<number>(182278019);

const imgUrl = ref<string>(
  "https://i0.hdslb.com/bfs/face/bea223e23f7577e71fb0978cb2ecf1141ab2a3ef.jpg@240w_240h_1c_1s_!web-avatar-nav.avif"
);
const toast = useToast();

const props = defineProps<{
  routeTo: (name: string) => void;
  type: number;
}>();

const configureService = () => {
  props.routeTo("config-info");
};

const logout = () => {
  toast.success("注销成功");
  uni.clearStorage();
  setTimeout(() => {
    uni.redirectTo({ url: "../../pages/before-login/index" });
  }, 1200);
};

onMounted(() => {
  console.log("啥时候触发的啊");
  uni.getStorage({
    key: "userInfo",
    success: function (res) {
      console.log("res", res.data);

      name.value = res.data.value1 || "获取用户数据失败";
      imgUrl.value = res.data.avater || "";
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

<style lang="scss" scoped>
.profile-contain {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  height: 20vh;
  background-color: rgb(100, 150, 255);
}

.profile {
  height: 80%;
  width: 80%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 10px 10px 0 0;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: white;
}

.info {
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.list {
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
  width: 100%;

  :deep(.list-item) {
    width: 80%;
    height: 32px;
    border-radius: 4px;
  }
}
</style>
>
