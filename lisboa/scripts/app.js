import actions from "./actions.js";
import nobles from "./nobles.js";
import decks from "./decks.js";
import View from "./view.js";
import Controller from "./controller.js";
import ViewModel from "./viewModel.js";
import StepHandler from "./stepHandler.js";

const viewModel = new ViewModel();
const view = new View(viewModel);
const controller = new Controller(
  view,
  nobles,
  decks,
  actions,
  new StepHandler()
);
