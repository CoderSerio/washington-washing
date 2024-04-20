<template>
  <div>
    <wd-button @click="showActions">确定支付</wd-button>
    <wd-action-sheet v-model="show" title="支付" @close="close">
      <view class="contain">
        <div class="paymethod"><span>支付方式：</span><wd-checkbox v-model="show" size="large"
            @change="handleChange">微信支付</wd-checkbox>
        </div>
        <div class="price">{{ price }}￥</div>
        <wd-button type="success">确认支付</wd-button>
      </view>
    </wd-action-sheet>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useToast } from 'wot-design-uni'
const show = ref<boolean>(false)
const price = ref<number>(20)
const toast = useToast()

function showActions() {
  show.value = true
  toast.show(`支付`)
}

function close() {
  show.value = false
}

</script>
<style scoped>
.contain {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.paymethod {
  display: flex;
  height: 20px;
}

.price {
  font-size: 40px;
  margin: 20px 0px;
}
</style>
