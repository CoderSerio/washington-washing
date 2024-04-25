<template>
  <wd-tabbar @change="handleChange" v-model="tabbar">
    <template v-for="item in dataList" :key="item.route">
      <wd-tabbar-item :title="item.title" :icon="item.icon"></wd-tabbar-item>
    </template>
  </wd-tabbar>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, toRefs } from "vue";

const CLOTHE_TYPE = ["西装", "皮衣", "棉衣", "化纤"];

const tabbar = ref(1);
const props = defineProps<{
  dataList: Array<
    Record<string, any> & { title: string; icon: string; route: string }
  >;
  routeTo: (name: string) => void;
  routeName: string;
}>();
const { dataList, routeName, routeTo } = toRefs(props);

const handleChange = (data: any) => {
  console.log("dataList");
  console.log(dataList, data.value);
  routeTo.value(dataList.value[data.value].route);
};
onMounted(() => {});
</script>

<style scoped></style>
