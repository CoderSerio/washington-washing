<template>
  <view class="page-wrapper">
    <view class="title">WASH 洗衣</view>

    <view class="buttons">
      <wd-button block type="primary" @click="props.changeStep('account-login')">
        WASH 账号登录
      </wd-button>
      <wd-button block type="success" @click="weixinLogin"> 微信登录 </wd-button>
      <wd-button block type="info" @click="props.changeStep('register')">
        注册
      </wd-button>
    </view>
  </view>
  <wd-toast />
</template>

<script setup lang="ts">
import { onLoad } from "@dcloudio/uni-app";
import { ref } from "vue";
import { request, getUsers } from '@/components/request/request'
import { useToast } from 'wot-design-uni'

const toast = useToast()

const props = defineProps<{
  changeStep: (step: string) => void;
  saveOpenid: (id: string) => void;
}>();

onLoad(() => {
  console.log("onload");
});

function weixinLogin() {
  uni.login({
    "provider": "weixin",
    "onlyAuthorize": true, // 微信登录仅请求授权认证
    success: function (event) {
      const { code } = event
      console.log(code);
      //客户端成功获取授权临时票据（code）,向业务服务器发起登录请求。
      const data = {
        "code": code
      }
      request('/user/bind', 'POST', data).then((resolve: any) => {
        const res = JSON.parse(resolve.data)
        console.log(res)
        getUsers().then((users: any) => {
          const userInfo: any[] = [];
          for (let i of users.data) {
            userInfo.push({ ...JSON.parse(i.wxInfo), type: i.type })
          }
          let isHave = false;
          for (let i of userInfo) {
            if (i.openid === res.openid) {
              toast.success('登录成功')
              setTimeout(() => {
                uni.redirectTo({ url: '../after-login/index' })
              }, 1000)
              isHave = true;
            }
          }
          if (!isHave) {
            toast.error('登录失败 请先去注册')
            props.saveOpenid(res.openid)
            props.changeStep('register');
          }
        })
      })
    },
    fail: function (err) {
      // 登录授权失败
      // err.code是错误码
    }
  })
}
</script>

<script lang="ts">
export default {
  options: {
    styleIsolation: "shared",
  },
};
</script>

<style lang="scss" scoped>
.page-wrapper {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .title {
    flex: 1;
    display: flex;
    align-items: center;
    font-size: 32px;
  }

  .buttons {
    width: 100%;
    flex: 3;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;

    :deep(.wd-button) {
      height: 48px;
      width: 80%;
    }
  }
}
</style>
