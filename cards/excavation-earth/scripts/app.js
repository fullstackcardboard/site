import CardController from "../../scripts/controllers/cardController.js";
import CardView from "../../scripts/views/cardView.js";
import data from "./data.js";
import GameState from "./gameState.js";
import CardViewModel from "../../scripts/viewModels/cardViewModel.js";
import AppFunctions from "./appFunctions.js";
import Instructions from "./instructions.js"

const instructions = new Instructions();

const cardViewModel = new CardViewModel();
const gameState = new GameState();
const appFunctions = new AppFunctions(cardViewModel);

const view = new CardView();
const controller = new CardController(
  data.cards,
  view,
  gameState,
  appFunctions.buildDecks,
  cardViewModel,
  appFunctions.reshuffle,
  appFunctions.updateStats
);
