<template>
  <div
    class="col-sm-12 col-md-8 bg-secondary rounded mx-auto text-light"
    style="height: 70vh;"
  >
    <div class="text-center">
      <h1>Encounter Preview</h1>
      <div v-for="property in encounter" :key="property.id">
        {{ property }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    encounter() {
      return this.$store.state.editor.encounter;
    }
  }
};
</script>

<style></style>
