import CardController from "../../scripts/controllers/cardController.js";
import CardView from "../../scripts/views/cardView.js";
import data from "./data.js";
import GameState from "./gameState.js";
import CardViewModel from "../../scripts/viewModels/cardViewModel.js"
import DeckBuilder from "./deckBuilder.js"


const cardViewModel = new CardViewModel();
const gameState = new GameState();
const builder = new DeckBuilder(cardViewModel);

const view = new CardView();
const controller = new CardController(data.cards, view, gameState, builder.buildDeck, cardViewModel);
