<template>
  <div>home</div>
</template>

<script setup lang="ts">
import { useMessage, NMessageProvider } from "naive-ui";

const message = useMessage();
message.warning("111");

</script>

<style scoped>
</style>
