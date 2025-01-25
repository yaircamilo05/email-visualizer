<template>
  <div class="flex justify-center mt-4">
    <button
      @click="prevPage"
      :disabled="currentPage === 1"
      class="px-4 py-2 mx-1 bg-gray-300 rounded disabled:opacity-50"
    >
      Previous
    </button>
    <span class="px-4 py-2 mx-1">{{ currentPage }} / {{ totalPages }}</span>
    <button
      @click="nextPage"
      :disabled="currentPage === totalPages || (typeof totalPages === 'number' && currentPage >= totalPages)"
      class="px-4 py-2 mx-1 bg-gray-300 rounded disabled:opacity-50"
    >
      Next
    </button>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps<{
  currentPage: number;
  totalPages: number | string;
}>();

const emit = defineEmits<{
  (e: 'updatePage', page: number): void;
}>();

const prevPage = () => {
  if (props.currentPage > 1) {
    emit('updatePage', props.currentPage - 1);
  }
};

const nextPage = () => {
  if (typeof props.totalPages === 'number') {
    if (props.currentPage < props.totalPages) {
      emit('updatePage', props.currentPage + 1);
    }
  } else {
    emit('updatePage', props.currentPage + 1);
  }
};
</script>

<style scoped>
/* Add your styles here */
</style>