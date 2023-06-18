<script setup lang="ts">
defineProps<{ msg: string }>();
</script>

<template>
  <div class="bg-blue-800 text-white p-5 rounded-md">
    <h1>{{ msg }}</h1>
    <h1 class="">
      This is an example
    </h1>
  </div>

</template>

<style scoped>
</style>
