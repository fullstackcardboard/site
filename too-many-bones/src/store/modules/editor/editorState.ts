import { IEncounter } from '@/models/interfaces/IEncounter';
import { Encounter } from '@/models/Encounter';

export interface IEditorState {
  encounter: IEncounter;
}

export const editorState = {
    encounter: Encounter
}
