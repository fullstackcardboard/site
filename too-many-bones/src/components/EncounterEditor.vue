<template>
  <div class="col-sm-12 col-md-3">
    <div class="form">
      <div class="form-group">
        <label for="Title" class="label font-weight-bold">Title</label>
        <input type="text" class="form-control" v-model="encounter.title" />
      </div>
      <div class="form-group">
        <button class="btn btn-secondary" @click="updateEncounter">Update</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { GeneralEncounter } from "../models/Encounter";
import { UpdateEncounterCommand } from "../commands/updateEncounterCommand";
import { EncounterLocalStorageService } from "../services/encounterLocalStorageService";
import { Encounter } from "../models/interfaces/encounter";

import Vue from "vue";

const encounterLocalStorageService = new EncounterLocalStorageService();

export default Vue.extend({
  data() {
    return {
      encounter: {} as Encounter
    };
  },
  methods: {
    updateEncounter() {
      const updateCommand = new UpdateEncounterCommand(
        this.encounter,
        encounterLocalStorageService,
        this.$store
      );

      updateCommand.execute();
    }
  }
});
</script>

<style></style>
