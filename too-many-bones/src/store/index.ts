import Vue from "vue";
import Vuex from "vuex";
import { editorModule } from "./modules/editor/editorModule";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    editor: editorModule
  }
});
