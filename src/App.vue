<template>
  <div class="container">
    <h1>Full Text Search Using Firebase</h1>
    <input v-model="searchText" type="text" placeholder="Type here..." />

    <div v-if="!isLoading" class="list">
      <div v-for="item in categories" :key="item.id">{{ item.name }}</div>
    </div>

    <div v-if="isLoading" class="loading">
      <p>Loading....</p>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { getCollectionQuery } from "./composables/getCollection";
import getCollectionSearch from "./composables/getCollectionSearch";
const categories = ref([]);
const searchText = ref("");

const { documents, isLoading } = getCollectionQuery("categories", []);

watch(documents, () => {
  if (documents.value.length > 0) {
    categories.value = documents.value;
  }
});

watch(searchText, () => {
  if (searchText.value) {
    const { documents: docs } = getCollectionSearch(
      `categories`,
      searchText.value.trim().toLocaleLowerCase(),
      "nameLowerCase"
    );

    watch(docs, () => {
      categories.value = docs.value;
    });
  } else {
    categories.value = documents.value;
  }
});
</script>
