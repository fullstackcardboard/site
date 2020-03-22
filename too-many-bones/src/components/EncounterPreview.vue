<template>
  <div class="col-sm-12 col-md-9">
    <div class="text-center">
      <label class="label font-weight-bold">{{ encounter.title }}</label>
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
