<template>
  <view class="page-wrapper">
    <view class="title"> 注册 </view>
    <view class="form">
      <wd-form ref="form" :model="model">
        <wd-cell-group border>
          <wd-input label="用户名" label-width="100px" prop="value1" clearable v-model="model.value1" placeholder="请输入用户名"
            required />
          <wd-input label="密码" label-width="100px" prop="value2" show-password clearable v-model="model.value2"
            placeholder="请输入密码" :rules="[{ required: true, message: '请填写密码' }]" />

          <view class="radio-group">
            <view class="radio-label">账号类型</view>
            <wd-radio-group shape="dot" v-model="model.value3" inline>
              <wd-radio :value="1">用户</wd-radio>
              <wd-radio :value="2">商家</wd-radio>
            </wd-radio-group>
          </view>
        </wd-cell-group>

        <view class="footer">
          <wd-button custom-class="submit-button" type="primary" block @click="handleSubmit">
            注册
          </wd-button>
          <wd-button custom-class="back-button" type="info" block @click="props.changeStep('init')">
            返回
          </wd-button>
        </view>
      </wd-form>
      <wd-toast />
    </view>
  </view>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import request from '@/components/request/request'
import { useToast } from 'wot-design-uni'

const toast = useToast()
const props = defineProps<{
  changeStep: (step: string) => void;
}>();

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
  toast.loading('加载中...')
  form.value
    .validate()
    .then(({ valid, errors }: any) => {
      if (valid) {
        console.log("ok");
        const Data = JSON.stringify(model);
        const data = {
          "wxInfo": "{}",
          "type": model.value3,
          "washInfo": Data
        };
        request('/user/createUser', 'POST', data).then((res) => {
          toast.success('注册成功!正在跳转……')
          console.log('注册成功', res)
          setTimeout(() => {
            props.changeStep('account-login')
          }, 1000)
        })
      }
    })
    .catch((error: Error) => {
      console.log(error, "error");
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

  :deep(.submit-button) {
    width: 80%;
    height: 48px !important;
  }

  :deep(.back-button) {
    width: 80%;
    height: 48px !important;
  }
}
</style>
