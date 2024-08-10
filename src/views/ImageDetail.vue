<template>
  <div>
    <ImageDetail :image="image" :title="title" :description="description" />
  </div>
</template>

<script>
import axios from 'axios';
import ImageDetail from '@/components/ImageDetail.vue';

export default {
  components: {
    ImageDetail,
  },
  data() {
    return {
      image: null,
      title: null,
      description: null,
    };
  },
  async created() {
    const id = this.$route.params.id;
    const title = this.$route.query.title;
    const description = this.$route.query.description;
    const response = await axios.get('http://images-api.nasa.gov/asset/'+id);
    this.image = response.data.collection.items;
    this.title = title;
    this.description = description;
    console.log("title: ", this.title)
    console.log("Description: ", this.description)
  },
};
</script>
