import CardController from "../../scripts/controllers/cardController.js";
import CardView from "../../scripts/views/cardView.js";
import data from "../scripts/data.js";

const view = new CardView();
const controller = new CardController(data.cards, view);
