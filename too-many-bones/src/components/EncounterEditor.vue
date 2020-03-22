<template>
  <div class="col-sm-6 col-md-3">
    <div class="form">
      <div class="form-group">
        <label for="Title" class="label" >{{encounter.title}}</label>
        <input type="text" class="form-input" v-model="encounter.title" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Encounter } from "../models/Encounter";

export default {
    data() {
        return {
            encounter: {} as Encounter
        }
    },
};
</script>

<style></style>
