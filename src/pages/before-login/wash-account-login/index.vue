<template>
  <view class="page-wrapper">
    <view class="title"> 登录 </view>
    <view class="form">
      <wd-form ref="form" :model="model">
        <wd-cell-group border>
          <wd-input label="用户名" label-width="100px" prop="value1" clearable v-model="model.value1" placeholder="请输入用户名"
            :rules="[{ required: true, message: '请填写用户名' }]" />
          <wd-input label="密码" label-width="100px" prop="value2" show-password clearable v-model="model.value2"
            placeholder="请输入密码" :rules="[{ required: true, message: '请填写密码' }]" />
        </wd-cell-group>

        <view class="footer">
          <wd-button custom-class="submit-button" type="primary" block @click="handleSubmit">
            登录
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
}>({
  value1: "",
  value2: "",
});

const form = ref();

function handleSubmit() {
  toast.loading('加载中...')
  form.value
    .validate()
    .then(({ valid, errors }: any) => {
      if (valid) {
        console.log("ok", model);
        request('/user/getUser', 'GET', {}).then((res: any) => {
          console.log("获取用户成功");
          const userInfo: any[] = [];
          for (let i of res.data) {
            userInfo.push({ ...JSON.parse(i.washInfo), type: i.type })
          }
          let isHave = false;
          for (let i of userInfo) {
            if (i.value1 === model.value1 && i.value2 === model.value2) {
              toast.success('登录成功')
              isHave = true;
            }
          }
          if (!isHave) {
            toast.error('登录失败 请检查账号和密码')
          }
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
