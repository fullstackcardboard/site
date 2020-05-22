import utilities from "../../../scripts/shared/utilities.js";
import getCurrentMission from "./missions.js";
import events from "../../scripts/events/cardEvents.js";

export default class AppFunctions {
  constructor(cardViewModel, eventBus) {
    this.cardViewModel = cardViewModel;
    this.cardViewModel.round = 1;
    this.utilities = utilities;
    this.cardViewModel.showReshuffle = true;
    eventBus.subscribe(events.CARD_DRAWN, (card) => {
      const reshuffle = document.getElementById("reshuffle");
      const draw = document.getElementById("draw");
      if (card.instructions.includes("reshuffle")) {
        reshuffle.classList.remove("d-none");
        draw.classList.add("d-none");
      } else {
        reshuffle.classList.add("d-none");
        draw.classList.remove("d-none");
      }
    });
    eventBus.subscribe(events.RESHUFFLED, () => {
      const draw = document.getElementById("draw");
      draw.classList.remove("d-none");
    })
  }

  removeSelectedCards = (selectedCards, arrayToRemoveFrom) => {
    for (let index = 0; index < selectedCards.length; index++) {
      let card = selectedCards[index];
      arrayToRemoveFrom = arrayToRemoveFrom.filter((x) => x.id != card.id);
    }
    return arrayToRemoveFrom;
  };

  deepCopy(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  buildDeck = () => {
    const mission = getCurrentMission();
    const cards = this.deepCopy(
      this.cardViewModel.cards.slice(mission.startCard - 1, mission.endCard)
    );
    this.cardViewModel.cards = cards;
    utilities.shuffle(this.cardViewModel.cards);
  };
}
