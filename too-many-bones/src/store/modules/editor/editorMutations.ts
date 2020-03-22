import { Encounter } from "@/models/interfaces/encounter";

export const EditorMutations = {
  update(state: any, encounter: Encounter) {
    state.encounter = encounter;
  }
};
