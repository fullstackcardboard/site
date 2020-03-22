import { Encounter } from "@/models/interfaces/encounter";

export interface EditorState {
  encounter: Encounter;
}

export const editorState = {
  encounter: {} as Encounter
};
