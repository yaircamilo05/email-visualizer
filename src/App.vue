<template>
  <div class="p-4">
    <div class="flex justify-between mb-4">
      <input
        v-model="searchQuery"
        @input="loadData"
        type="text"
        placeholder="Search..."
        class="p-2 border border-gray-300 rounded"
      />
      <select v-model="resultsPerPage" @change="loadData" class="p-2 border border-gray-300 rounded">
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
    </div>
    <table class="min-w-full bg-white">
      <thead>
        <tr>
          <th class="py-2 px-4 border-b-2 border-gray-300 bg-gray-200 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">Subject</th>
          <th class="py-2 px-4 border-b-2 border-gray-300 bg-gray-200 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">From</th>
          <th class="py-2 px-4 border-b-2 border-gray-300 bg-gray-200 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">To</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="hit in data?.hits" :key="hit._timestamp" @click="selectEmail(hit)" class="cursor-pointer">
          <td class="py-2 px-4 border-b border-gray-300">{{ hit.subject }}</td>
          <td class="py-2 px-4 border-b border-gray-300">{{ hit.from }}</td>
          <td class="py-2 px-4 border-b border-gray-300">{{ hit.to }}</td>
        </tr>
      </tbody>
    </table>

    <EmailDetails v-if="selectedEmail" :email="selectedEmail" />
  </div>

  <RouterView />
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { fetchData } from '@/api/apiService';
import type { ApiResponse, Hit } from '@/models/response.model';
import EmailDetails from '@/components/EmailDetails.vue';

const data = ref<ApiResponse | null>(null);
const searchQuery = ref('');
const resultsPerPage = ref(10);
const selectedEmail = ref<Hit | null>(null);

const loadData = async () => {
  try {
    data.value = await fetchData(resultsPerPage.value, searchQuery.value);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const selectEmail = (email: Hit) => {
  selectedEmail.value = email;
};

onMounted(() => {
  loadData();
});

watch([searchQuery, resultsPerPage], loadData);
</script>

<style scoped>
/* Add your styles here */
</style>