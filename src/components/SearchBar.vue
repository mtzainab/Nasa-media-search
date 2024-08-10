<template>
  <div class="container mt-3">
    <div class="row justify-content-center">
      <div class="col-md-5">
        <div class="row">
          <div class="col-12">
            <div class="input-group mb-3">
              <input v-model="query" @keyup.enter="validateAndSearch" class="form-control"
                :class="{ 'is-invalid': validationError }" placeholder="Search for NASA Media..." />
              <button @click="validateAndSearch" class="btn btn-primary">Search</button>
              <div v-if="validationError" class="invalid-feedback">
                {{ validationError }}
              </div>
              <div v-if="mediaValidationError" class="invalid-feedback">
                {{ mediaValidationError }}
              </div>
            </div>
            <div class="mb-3">
              <div class="form-check-inline">
                <input v-model="media_types" type="checkbox" id="image" value="image" class="form-check-input" checked @change="validateAndSearch" :class="{ 'is-invalid': mediaValidationError}">
                <label for="image" class="form-check-label">Image</label>
              </div>
              <div class="form-check-inline">
                <input v-model="media_types" type="checkbox" id="audio" value="audio" class="form-check-input" :class="{ 'is-invalid': mediaValidationError}" @change="validateAndSearch" disabled>
                <label for="audio" class="form-check-label">Audio</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: '',
      media_types: [],
      validationError: '',
      mediaValidationError: '',
    };
  },
  methods: {
    validateAndSearch() {
      const media_types = this.media_types.toString()
      if (!this.query.trim()) {
        this.validationError = 'Search query cannot be empty.';
      } 
      else if(!media_types.trim()) {
        this.validationError = ''
        this.mediaValidationError = 'Please check at least one media type';
      } 
      else {
        this.validationError = '';
        this.mediaValidationError='';
        this.$emit('search', this.query, media_types);
        console.log("media types: ", this.media_types)
      }
    },
  },
};
</script>

<style scoped>
.is-invalid {
  border-color: #dc3545;
}

.invalid-feedback {
  display: block;
}
</style>
