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
          <div>{{ name }}</div>
        </div>
      </div>
    </div>
    <wd-grid clickable square>
      <wd-grid-item icon="list" icon-size="30px" text="订单管理" />
      <wd-grid-item icon="star" icon-size="30px" text="评价管理" />
      <wd-grid-item icon="star" icon-size="30px" text="注销登录11" />
    </wd-grid>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useToast } from "wot-design-uni";
const name = ref<string>("我是xxx");
const phone = ref<number>(182278019);

const imgUrl = ref<string>(
  "https://i0.hdslb.com/bfs/face/bea223e23f7577e71fb0978cb2ecf1141ab2a3ef.jpg@240w_240h_1c_1s_!web-avatar-nav.avif"
);

const toast = useToast();

const logout = () => {
  toast.success("注销成功");
  uni.clearStorage();
  setTimeout(() => {
    uni.redirectTo({ url: "../../../before-login/index" });
    console.log("123");
  }, 1200);
};
onMounted(() => {
  uni.getStorage({
    key: "userInfo",
    success: function (res) {
      console.log(res.data);
      name.value = res.data.value1;
      imgUrl.value = res.data.avater;
    },
  });
});
</script>
<style scoped>
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
</style>
>
