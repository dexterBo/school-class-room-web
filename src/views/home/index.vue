<template>
  <el-table :data="tableList" style="width: 100%">
    <el-table-column prop="course" label="Date" />
    <el-table-column prop="entrust" label="Name" />
    <el-table-column prop="examName" label="Address" />
    <el-table-column prop="manager" label="Date" />
    <el-table-column prop="school" label="Name" />
    <el-table-column prop="status" label="Address" />
    <el-table-column prop="time" label="Date" />
  </el-table>
  <el-pagination
    v-model:currentPage="currentPage"
    v-model:page-size="pageSize"
    :page-sizes="[10, 20, 30, 40]"
    layout="prev, pager, next, jumper, total"
    :total="total"
  >
  </el-pagination>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { getTableList } from "./server";

const pageSize = ref(10);
const currentPage = ref(1);
const total = ref(0);
let tableList = ref<JSONObject[]>([]);

const query = async () => {
  const result = await getTableList({
    pageSize: pageSize.value,
    currentPage: currentPage.value,
  });
  tableList.value = result.list;
  pageSize.value = result.pageSize || 10;
  currentPage.value = result.pageNum || 1;
  total.value = result.total || 0;
};

watchEffect(() => {
  query();
});

</script>

<style scoped></style>
