<template>
  <div>
    <!-- <wd-button size="small" @click="showActions">确定支付</wd-button> -->
    <wd-action-sheet
      v-model="props.show"
      title="支付"
      @close="props.setShow(false)"
    >
      <view class="contain">
        <div class="paymethod">
          <span>支付方式：</span>
          <wd-checkbox v-model="show" size="large"> 微信支付 </wd-checkbox>
        </div>
        <div class="price">{{ props.price }}￥</div>
        <wd-button type="success" @click="handleClick">确认支付</wd-button>
      </view>
    </wd-action-sheet>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from "vue";
import { useToast } from "wot-design-uni";
const show = ref<boolean>(false);
const toast = useToast();
const emit = defineEmits(["handlePayment"]);

const props = defineProps<{
  show: boolean;
  setShow: (flag: boolean) => void;
  price: number;
}>();

// function showActions() {
//   show.value = true;
//   toast.show(`支付`);
// }

// function close() {
//   show.value = false;
// }

function handleClick() {
  emit("handlePayment");
  show.value = false;
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
