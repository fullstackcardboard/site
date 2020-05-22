import CardController from "../../scripts/controllers/cardController.js";
import CardView from "../../scripts/views/cardView.js";
import data from "./data.js";
import GameState from "./gameState.js";
import CardViewModel from "../../scripts/viewModels/cardViewModel.js";
import AppFunctions from "./appFunctions.js";
import eventBus from "../../../scripts/shared/eventBus.js"
import HexMap from "./hexMap.js"
import getCurrentMission from "./missions.js";

const hexMap = new HexMap(eventBus);
const cardViewModel = new CardViewModel();
const mission = getCurrentMission();
const gameState = new GameState(mission);
const appFunctions = new AppFunctions(cardViewModel, eventBus);

const view = new CardView();
const controller = new CardController(
  data.cards,
  view,
  gameState,
  appFunctions.buildDeck,
  cardViewModel,
  null,
  null,
  eventBus
);

const missionInstructions = document.getElementById("missionInstructions");
missionInstructions.src = `http://docs.google.com/gview?url=fullstackcardboard.com${mission.missionInstructionsUrl}&embedded=true`;