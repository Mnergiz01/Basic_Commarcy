// stores/useCategoryStore.js
import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

export const useCategoryStore = defineStore('category', () => {
  const categories = ref([]);

  const fetchCategories = async () => {
    if (categories.value.length === 0) {  // Eğer kategoriler boşsa API isteği yap
      try {
        const response = await axios.get('https://dummyjson.com/products/categories');
        categories.value = response.data;
      } catch (error) {
        console.error('Kategori verileri alınırken hata oluştu:', error);
      }
    }
  };

  return { categories, fetchCategories };
});
