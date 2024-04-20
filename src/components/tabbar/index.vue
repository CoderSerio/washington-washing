<template>
  <wd-tabbar @change="handleChange" v-model="tabbar">
    <template v-for="item in dataList" :key="item.route">
      <wd-tabbar-item :title="item.title" :icon="item.icon"></wd-tabbar-item>
    </template>
  </wd-tabbar>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
const tabbar = ref(1);
const { routeTo, dataList = [] } = defineProps<{
  dataList: Array<
    Record<string, any> & { title: string; icon: string; route: string }
  >;
  routeTo: (name: string) => void;
  routeName: string;
}>();

const handleChange = (data: any) => {
  routeTo(dataList[data.value].route);
};
</script>

<style scoped></style>
