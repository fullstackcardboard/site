import CardController from "../../scripts/controllers/cardController.js";
import CardView from "../../scripts/views/cardView.js";
import data from "../scripts/data.js";
import GameState from "./gameState.js";
import DeckBuilder from "./deckBuilder.js"
import CardViewModel from "../../scripts/viewModels/cardViewModel.js"
const cardViewModel = new CardViewModel();
const builder = new DeckBuilder(cardViewModel);
const gameState = new GameState();

const view = new CardView();
const controller = new CardController(data.cards, view, gameState, builder.buildDeck, cardViewModel);
