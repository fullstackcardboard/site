import actions from "./actions.js";
import nobles from "./nobles.js";
import decks from "./decks.js";
import View from "./view.js";
import Controller from "./controller.js";
import ViewModel from "./viewModel.js";
import StepManager from "./stepManager.js";
import GameState from "./gameState.js";
const gameState = new GameState();
const stepManager = new StepManager();

const viewModel = new ViewModel();
const view = new View(viewModel);
const controller = new Controller(
  view,
  nobles,
  decks,
  actions,
  stepManager,
  gameState
);
