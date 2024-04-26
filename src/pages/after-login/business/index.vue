<template>
  <template v-if="routeName === 'business-order-list'">
    <orderList :routeTo="routeTo"></orderList>
  </template>

  <template v-else-if="routeName === 'business-profile'">
    <profile></profile>
  </template>

  <template v-else>
    <notFound :routeTo="routeTo"></notFound>
  </template>
</template>

<script setup lang="ts">
import orderList from "./order-list/index.vue";
import profile from "./profile/index.vue";
import notFound from "../../../components/404/index.vue";

const { routeName, routeTo } = defineProps<{
  routeName: string;
  routeTo: (name: string) => void;
}>();
</script>
