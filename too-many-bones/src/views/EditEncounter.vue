<template>
  <div class="container" style="height: 90vh;">
    <div class="row">
      <encounter-editor />
      <encounter-preview />
    </div>
  </div>
</template>

<script lang="ts">
import EncounterEditor from "../components/EncounterEditor.vue";
import EncounterPreview from "../components/EncounterPreview.vue";
export default {
  components: {
    EncounterEditor,
    EncounterPreview
  }
};
</script>

<style></style>
