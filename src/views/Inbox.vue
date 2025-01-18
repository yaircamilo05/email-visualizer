<template>
  <div class="p-4">
    <Seeker
      :searchQuery="searchQuery"
      :resultsPerPage="resultsPerPage"
      @update:searchQuery="searchQuery = $event"
      @update:resultsPerPage="resultsPerPage = $event"
      @applyChanges="applyChanges"
    />
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
    <Pagination
      :currentPage="currentPage"
      :totalPages="totalPages"
      @updatePage="updatePage"
    />

    <Modal v-if="selectedEmail" title="Email Details" @close="selectedEmail = null">
      <EmailDetails :email="selectedEmail" />
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { fetchData } from '@/api/apiService';
import type { ApiResponse, Hit } from '@/models/response.model';
import Modal from '@/components/Modal.vue';
import EmailDetails from '@/components/EmailDetails.vue';
import Pagination from '@/components/Pagination.vue';
import Seeker from '@/components/Seeker.vue';
import { showErrorAlert, showWarningAlert } from '@/utils/alerts';



const data = ref<ApiResponse | null>(null);
const searchQuery = ref('');
const resultsPerPage = ref(10);
const currentPage = ref(1);
const totalPages = ref(1);
const selectedEmail = ref<Hit | null>(null);

const loadData = async () => {
  try {
    const response = await fetchData(resultsPerPage.value, searchQuery.value, (currentPage.value - 1) * resultsPerPage.value);
    data.value = response;
    totalPages.value = Math.ceil(response.scan_records / resultsPerPage.value);
    if (data.value.hits.length === 0) {
        showWarningAlert('No Results', 'No emails found!');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    showErrorAlert('Oops...', 'Error fetching data!');
  }
};

const applyChanges = () => {
  currentPage.value = 1;
  loadData();
};

const updatePage = (page: number) => {
  currentPage.value = page;
  loadData();
};

const selectEmail = (email: Hit) => {
  selectedEmail.value = email;
};

onMounted(() => {
  loadData();
});
</script>

<style scoped>
/* Add your styles here */
</style>