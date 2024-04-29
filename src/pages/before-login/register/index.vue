<template>
  <view class="page-wrapper">
    <view class="title"> 注册 </view>
    <view class="form">
      <wd-form ref="form" :model="model">
        <wd-cell-group border>
          <wd-input
            label="用户名"
            label-width="100px"
            prop="value1"
            clearable
            v-model="model.value1"
            placeholder="请输入用户名"
            required
          />
          <wd-input
            label="密码"
            label-width="100px"
            prop="value2"
            show-password
            clearable
            v-model="model.value2"
            placeholder="请输入密码"
            :rules="[{ required: true, message: '请填写密码' }]"
          />

          <view class="radio-group">
            <view class="radio-label">账号类型</view>
            <wd-radio-group shape="dot" v-model="model.value3" inline>
              <wd-radio :value="1">用户</wd-radio>
              <wd-radio :value="2">商家</wd-radio>
            </wd-radio-group>
          </view>

          <button
            class="submit-button"
            open-type="chooseAvatar"
            @chooseavatar="handleAvater"
          >
            关联微信并注册
          </button>
        </wd-cell-group>

        <view class="footer">
          <!-- <wd-button
            custom-class="submit-button"
            type="primary"
            block
            @click="handleSubmit"
          >
            绑定微信并注册
          </wd-button> -->
          <wd-button
            custom-class="back-button"
            type="info"
            block
            @click="props.changeStep('init')"
          >
            返回
          </wd-button>
        </view>
      </wd-form>
      <wd-toast />
    </view>
  </view>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import { request } from "@/components/request/request";
import { useToast } from "wot-design-uni";

const toast = useToast();
const props = defineProps<{
  openid: string;
  changeStep: (step: string) => void;
}>();
const wxInfo = reactive<{
  avater: string;
  openid: string;
}>({
  avater: "",
  openid: "",
});
const model = reactive<{
  value1: string;
  value2: string;
  value3: number;
}>({
  value1: "",
  value2: "",
  value3: 1,
});

const form = ref();

function handleSubmit() {
  toast.loading("加载中...");
  if (props.openid)
    form.value
      .validate()
      .then(({ valid, errors }: any) => {
        if (valid) {
          console.log("ok");
          const Data = JSON.stringify(model);

          const data = {
            wxInfo: JSON.stringify(wxInfo),
            type: model.value3,
            washInfo: Data,
          };
          toast.loading("正在创建用户...");
          request("/user/createUser", "POST", data).then((res) => {
            toast.success("注册成功!正在跳转……");
            console.log("注册成功", res);
            setTimeout(() => {
              props.changeStep("account-login");
            }, 1000);
          });
        }
      })
      .catch((error: Error) => {
        console.log(error, "error");
      });
}
function handleAvater(res: any) {
  if (model.value1 && model.value2 && model.value3) {
    wxInfo.avater = res.detail.avatarUrl;
    handleSubmit();
  } else {
    toast.error("请先填写信息");
  }
}
onMounted(() => {
  console.log(props.openid);
  if (props.openid != "0") {
    wxInfo.openid = props.openid;
    toast.info("注册账户后即可微信登录~");
  } else {
    uni.login({
      provider: "weixin",
      onlyAuthorize: true, // 微信登录仅请求授权认证
      success: function (event) {
        const { code } = event;
        //客户端成功获取授权临时票据（code）,向业务服务器发起登录请求。
        const data = {
          code: code,
        };
        request("/user/bind", "POST", data).then((resolve: any) => {
          const res = JSON.parse(resolve.data);
          console.log(res.openid);
          wxInfo.openid = res.openid;
        });
      },
      fail: function (err) {
        // 登录授权失败
        // err.code是错误码
      },
    });
  }
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
.page-wrapper {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .title {
    font-size: 32px;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
  }

  .form {
    flex: 3;
  }
}

.radio-group {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 12px;
  padding: 8px 16px;

  .radio-label {
    display: inline-block;
    font-size: var(--wot-input-fs, var(--wot-cell-title-fs, 14px));
    line-height: var(--wot-cell-line-height, 24px);
  }
}

.footer {
  margin-top: 40px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;

  :deep(.back-button) {
    width: 100%;
    height: 48px !important;
    border-radius: 4px !important;
    border: 1px solid #3333;
    font-size: 24px;
  }
}
</style>
