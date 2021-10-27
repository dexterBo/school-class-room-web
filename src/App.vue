<template>
    <router-link to="/home"><NButton>Go to Home</NButton></router-link>
    <router-link to="/list"><NButton>Go to List</NButton></router-link>
  <router-view></router-view>
</template>

<script setup lang="ts">
import { NButton } from "naive-ui";
</script>

<style>
</style>