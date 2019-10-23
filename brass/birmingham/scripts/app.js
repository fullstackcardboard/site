import CardController from "../../scripts/controllers/cardController.js";
import CardView from "../../scripts/views/cardView.js";
import data from "../scripts/data.js";
import GameState from "./gameState.js";

const gameState = new GameState();

const view = new CardView();
const controller = new CardController(data.cards, view, gameState);
