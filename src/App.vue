<template>
 <div id="app">
    <el-config-provider :locale="locale">
      <router-link to="/home"><el-button>Go to Home</el-button></router-link>
      <router-link to="/list"><el-button>Go to List</el-button></router-link>
      <router-view></router-view>
    </el-config-provider>
  </div>
</template>

<script setup lang="ts">
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'

const locale = zhCn

</script>

<style></style>
