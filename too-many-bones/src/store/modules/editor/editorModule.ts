import { editorMutations, IEditorMutations } from "./editorMutations";
import { editorState, IEditorState } from "./editorState";

export interface IEditorModule {
  state: IEditorState;
  mutations: IEditorMutations;
  commit(mutation: String, payload: any): void;
}

export const editorModule = {
  state: editorState,
  mutations: editorMutations
};
