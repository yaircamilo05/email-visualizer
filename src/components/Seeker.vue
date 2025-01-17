<template>
  <div class="flex justify-between mb-4 items-center">
    <img src="@/assets/Enron.png" alt="Logo" class="h-12 w-12 mr-4" />
    <input
      :value="searchQuery"
      @input="$emit('update:searchQuery', ($event.target as HTMLInputElement).value)"
      type="text"
      placeholder="Search..."
      class="p-2 border border-gray-300 rounded"
    />
    <select
      :value="resultsPerPage"
      @change="$emit('update:resultsPerPage', Number(($event.target as HTMLInputElement).value))"
      class="p-2 border border-gray-300 rounded"
    >
      <option :value="5">5</option>
      <option :value="10">10</option>
      <option :value="20">20</option>
      <option :value="50">50</option>
      <option :value="100">100</option>
    </select>
    <button @click="$emit('applyChanges')" class="p-2 bg-blue-500 text-white rounded">Actualizar</button>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps<{
  searchQuery: string;
  resultsPerPage: number;
}>();

const emit = defineEmits<{
  (e: 'applyChanges'): void;
  (e: 'update:searchQuery', value: string): void;
  (e: 'update:resultsPerPage', value: number): void;
}>();
</script>

<style scoped>
/* Add your styles here */
</style>