import buildMissionCardData from "./data.js";
import CardController from "./controllers/cardController.js";
import CardView from "./views/cardView.js";
import GameState from "./gameState.js";

const cards = buildMissionCardData(15, 55);
const gameState = new GameState();
const view = new CardView();
const controller = new CardController(cards, view, gameState);
