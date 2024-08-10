<template>
  <div class="container mt-3" v-if="image">
    <div class="row">
      <div class="col">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title text-center">{{ title }}</h5>
            <p class="card-text text-center" v-html="description"></p>
            <img :src="image[0].href" class="card-img-top" alt="Image">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    image: {
      type: Object,
      required: true
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
};
</script>
