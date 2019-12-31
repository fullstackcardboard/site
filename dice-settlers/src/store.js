import ActionHex from "./models/actionHex.js";
import Vue from "vue"
import Vuex from "vuex"
const actionHex = new ActionHex();

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    actionHex
  },
  mutations: {
    setSide(state, numberOfSidesToMove) {
      state.actionHex.setActiveSide(numberOfSidesToMove);
    }
  }
});