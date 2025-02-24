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
import { ref, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { fetchData } from '@/api/apiService';
import type { ApiResponse, Hit } from '@/models/response.model';
import Modal from '@/components/Modal.vue';
import EmailDetails from '@/components/EmailDetails.vue';
import Pagination from '@/components/Pagination.vue';
import Seeker from '@/components/Seeker.vue';
import { showWarningAlert, showErrorAlert } from '@/utils/alerts';

const data = ref<ApiResponse | null>(null);
const searchQuery = ref('');
const resultsPerPage = ref(10);
const currentPage = ref(1);
const totalPages = ref<number | string>(1);
const selectedEmail = ref<Hit | null>(null);

const router = useRouter();
const route = useRoute();

const loadData = async () => {
  try {
    const response = await fetchData(resultsPerPage.value, searchQuery.value, (currentPage.value - 1) * resultsPerPage.value);
    data.value = response;
    if (data.value.hits.length === 0) {
      showWarningAlert('No Results', 'No emails found!');
    }
    if (searchQuery.value) {
      totalPages.value = 'muchas'; // Set to 'muchas' when a search parameter is provided
    } else {
      totalPages.value = Math.ceil((data.value?.scan_records ?? 0) / resultsPerPage.value || 1);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    showErrorAlert('Oops...', 'Error fetching data!');
  }
};

const applyChanges = () => {
  currentPage.value = 1;
  router.push({ query: { ...route.query, page: currentPage.value, search: searchQuery.value } });
  loadData();
};

const updatePage = (page: number) => {
  currentPage.value = page;
  router.push({ query: { ...route.query, page: currentPage.value, search: searchQuery.value } });
  loadData();
};

const selectEmail = (email: Hit) => {
  selectedEmail.value = email;
};

onMounted(() => {
  if (route.query.page) {
    currentPage.value = Number(route.query.page);
  }
  if (route.query.search) {
    searchQuery.value = String(route.query.search);
  }
  loadData();
});

watch(route, (newRoute) => {
  if (newRoute.query.page) {
    currentPage.value = Number(newRoute.query.page);
  }
  if (newRoute.query.search) {
    searchQuery.value = String(newRoute.query.search);
  }
  loadData();
});
</script>

<style scoped>
/* Add your styles here */
</style>