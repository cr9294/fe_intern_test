<template>
  <div>
    <h1>Vue Table with Filters and Sort</h1>
    <Table />
  </div>
</template>

<script>
import Table from './components/Table.vue';

export default {
  components: {
    Table
  }
};
</script>

<style>
h1 {
  text-align: center;
  margin-top: 20px;
}
</style>
