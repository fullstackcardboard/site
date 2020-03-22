import Vue from "vue";
import Vuex from "vuex";
import { editorState } from './modules/editor/editorState';
import { EditorMutations } from './modules/editor/editorMutations';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    editor: {
      state: editorState,
      mutations: EditorMutations
    }
  }
});
