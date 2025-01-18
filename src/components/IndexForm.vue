<template>
  <div class="p-4 border rounded bg-white">
    <h2 class="text-xl font-bold mb-4">Select Folder and Name</h2>
    <form @submit.prevent="submitForm">
      <div class="mb-4">
        <label for="folder" class="block text-sm font-medium text-gray-700">Select Folder</label>
        <input
          type="file"
          id="folder"
          webkitdirectory
          directory
          @change="handleFolderSelect"
          class="mt-1 p-2 border border-gray-300 rounded w-full"
        />
      </div>
      <div class="mb-4">
        <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          id="name"
          v-model="name"
          class="mt-1 p-2 border border-gray-300 rounded w-full"
        />
      </div>
      <button type="submit" class="p-2 bg-blue-500 text-white rounded">Submit</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const folder = ref<FileList | null>(null);
const name = ref('');

const handleFolderSelect = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files) {
    folder.value = input.files;
  }
};

const submitForm = async () => {
  if (!folder.value || !name.value) {
    alert('Please select a folder and enter a name.');
    return;
  }

  const formData = new FormData();
  formData.append('name', name.value);
  Array.from(folder.value).forEach((file) => {
    formData.append('files', file);
  });

  try {
    const response = await fetch('http://localhost:8080/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload');
    }

    alert('Folder uploaded successfully');
  } catch (error) {
    console.error('Error uploading folder:', error);
    alert('Error uploading folder');
  }
};
</script>

<style scoped>
/* Add your styles here */
</style>