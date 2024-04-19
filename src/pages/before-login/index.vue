<template>
  <ant-container title="按钮类型" className="list">
    <ant-button type="primary" bind:tap="handleTap"> 主要按钮 </ant-button>

    <ant-button type="default" bind:tap="handleTap"> 次要按钮 </ant-button>

    <ant-button type="text" bind:tap="handleTap"> 文本按钮 </ant-button>
  </ant-container>

  <ant-container title="带辅助文案按钮" className="list">
    <ant-button type="primary" subText="副标题" bind:tap="handleTap">
      主要按钮
    </ant-button>

    <ant-button type="default" subText="副标题" bind:tap="handleTap">
      次要按钮
    </ant-button>

    <ant-button type="text" subText="副标题" bind:tap="handleTap">
      文本按钮
    </ant-button>
  </ant-container>

  <ant-container title="禁用" className="list">
    <ant-button type="primary" disabled> 主要按钮 </ant-button>

    <ant-button type="default" disabled> 次要按钮 </ant-button>

    <ant-button type="text" disabled> 文本按钮 </ant-button>
  </ant-container>

  <ant-container title="加载状态" className="list">
    <ant-button type="primary" loading> 主要按钮 </ant-button>

    <ant-button type="default" loading> 次要按钮 </ant-button>

    <ant-button type="text" loading> 文本 </ant-button>
  </ant-container>

  <ant-container title="危险" className="list">
    <ant-button type="primary" danger bind:tap="handleTap">
      主要按钮
    </ant-button>

    <ant-button type="default" danger bind:tap="handleTap">
      次要按钮
    </ant-button>

    <ant-button type="text" danger bind:tap="handleTap"> 文本按钮 </ant-button>
  </ant-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
const title = ref("Hello");
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
