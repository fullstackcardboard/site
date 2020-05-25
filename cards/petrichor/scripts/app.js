import CardController from "../../scripts/controllers/cardController.js";
import CardView from "../../scripts/views/cardView.js";
import data from "./data.js";
import GameState from "./gameState.js";
import CardViewModel from "../../scripts/viewModels/cardViewModel.js";
import AppFunctions from "./appFunctions.js";
import eventBus from "../../../scripts/shared/eventBus.js";

const cardViewModel = new CardViewModel();
const gameState = new GameState();
const appFunctions = new AppFunctions(cardViewModel, eventBus);

const view = new CardView();
const controller = new CardController(
  data.baseCards,
  view,
  gameState,
  appFunctions.buildDeck,
  cardViewModel,
  null,
  null,
  eventBus
);
