<template>
  <div
    class="col-sm-12 col-md-3 bg-dark text-light rounded mb-2"
    style="height: 80vh;"
  >
    <div class="form">
      <div class="form-group">
        <label for="Type" class="label font-weight-bold">Type</label>
        <select v-model="encounter.type" class="form-control">
          <option>*</option>
          <option>General</option>
          <option>Special</option>
        </select>
      </div>
      <div class="form-group">
        <label for="Title" class="label font-weight-bold">Title</label>
        <input type="text" class="form-control" v-model="encounter.title" />
      </div>
      <div class="form-group">
        <label for="Test" class="label font-weight-bold">Story Text</label>
        <input type="text" class="form-control" v-model="encounter.text" />
      </div>
      <div class="form-group">
        <label for="Choices" class="label font-weight-bold">Choices</label>
        <div v-for="choice in encounter.choices" :key="choice">
          <label for="Heading">Heading</label>
          <input v-model="choice.heading" class="form-control" />
          <label for="Text">Text</label>
          <input v-model="choice.text" class="form-control" />
          <label class="label font-weight-bold primary" />
          <div v-for="reward in choice.reward" :key="reward.id" class="col-10 bg-secondary border border-dark rounded">
            <label for="RewardType">Type</label>
            <select v-model="reward.type">
              <option>*</option>
              <option>Skill Point</option>
              <option>Loot</option>
            </select>
            <label></label>
          </div>
        </div>
      </div>
      <div class="form-group">
        <button class="btn btn-secondary" @click="updateEncounter">
          Update
        </button>
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
