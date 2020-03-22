import { editorMutationDefinitions } from "../editorMutationDefinitions";
import { IEncounter } from "@/models/interfaces/IEncounter";
import { IEditorState } from "./editorState";

export interface IEditorMutations {
  update(state: IEditorState, encounter: IEncounter): void;
}

export const editorMutations = {
  [editorMutationDefinitions.UPDATE_ENCOUNTER]: (
    state: IEditorState,
    encounter: IEncounter
  ) => {
    state.encounter = encounter;
  }
};
