<template>
  <div>
    <SearchBar @search="handleSearch" />
    <ImageList :images="images" @select="viewDetail" />
    <PaginationLink :currentPage="currentPage" :totalPages="totalPages" @changePage="changePage" />
  </div>
</template>

<script>
import axios from 'axios';
import SearchBar from '@/components/SearchBar.vue';
import ImageList from '@/components/ImageList.vue';
import PaginationLink from '@/components/PaginationLink.vue';

export default {
  components: {
    PaginationLink,
    SearchBar,
    ImageList,
  },
  data() {
    return {
      images: [],
      currentPage: 1,
      totalPages: 0,
      searchQuery: '', // Store the search query
    };
  },
  methods: {
    async searchImages(query, media_types, page = 1) {
      const response = await axios.get('https://images-api.nasa.gov/search', {
        params: {
          q: query,
          media_type: media_types,
          page: page,
          page_size: 20
        },
      });
      this.images = response.data.collection.items;
      this.currentPage = page;
      this.totalPages = Math.ceil(response.data.collection.metadata.total_hits / 20); //20 results per page
    },
    handleSearch(query, media_type) {
      this.searchQuery = query; // Store the query
      this.media_type = media_type;
      this.searchImages(query,media_type, 1); // Start at page 1 for a new search
    },
    viewDetail(image) {
      this.$router.push({ name: 'ImageDetail', params: { id: image.data[0].nasa_id }, query: {title: image.data[0].title, description: image.data[0].description}});
    },
    changePage(page)
    {
      this.searchImages(this.searchQuery, this.media_type, page);
    },
  },
};
</script>
