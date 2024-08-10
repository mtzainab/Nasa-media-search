<template>
  <div class="container mt-3">
    <div class="image-gallery">
      <div v-for="image in images" :key="image.data[0].nasa_id" class="image-item" @click="selectImage(image)">
        <div class="card" @click="selectImage(image)">
          <img :src="image.links[0].href" class="card-img-top img-fluid w-100" alt="Image" @click="selectImage(image)">
        </div>
        <div class="image-info">
          <h5>{{ image.data[0].title }}</h5>
          <p v-html="image.data[0].description"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['images'],
  methods: {
    selectImage(image) {
      this.$emit('select', image);
    },
  },
};
</script>

<style scoped>
.image-gallery {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  /* Four equal columns */
  gap: 15px;
  margin: 20px 0;
}

.image-item {
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.image-item:hover {
  transform: translateY(-5px);
}

.image-item img {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 8px;
  cursor: pointer;
}

.image-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 10px;
  text-align: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.image-item:hover .image-info {
  opacity: 1;
}

.image-info h5 {
  margin: 0;
  font-size: 1.2em;
}

.image-info p {
  font-size: 0.9em;
  margin-top: 5px;
}
</style>
