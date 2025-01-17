<template>
  <div class="p-4 border border-gray-300 rounded bg-white">
    <h2 class="text-xl font-bold mb-4">Email Details</h2>
    <p><strong>Subject:</strong> {{ email.subject }}</p>
    <p><strong>From:</strong> {{ email.from }}</p>
    <p><strong>To:</strong> {{ email.to }}</p>
    <p><strong>Date:</strong> {{ email.date }}</p>
    <p><strong>Body:</strong></p>
    <pre class="whitespace-pre-wrap">{{ email.body }}</pre>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import type { Hit } from '@/models/response.model';

const props = defineProps<{
  email: Hit;
}>();
</script>

<style scoped>
/* Add your styles here */
</style>