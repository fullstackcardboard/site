import utilities from "../../../scripts/shared/utilities.js";
import events from "../../scripts/events/cardEvents.js";
import data from "./data.js";

export default class AppFunctions {
  constructor(cardViewModel, eventBus) {
    this.cardViewModel = cardViewModel;
    this.cardViewModel.round = 1;
    this.utilities = utilities;
    this.cardViewModel.showReshuffle = true;
    const draw = document.getElementById("draw");
    const reshuffle = document.getElementById("reshuffle");

    eventBus.subscribe(events.RESHUFFLED, () => {
      draw.classList.remove("d-none");
      reshuffle.classList.add("disabled");
      reshuffle.disabled = true;
    });

    eventBus.subscribe(events.CARD_DRAWN, (card) => {
      if (!card.instructions.includes("reshuffle")) {
        return;
      }

      reshuffle.disabled = false;
      reshuffle.classList.remove("disabled");
      draw.classList.add("d-none");
    });

    eventBus.subscribe(events.GAME_LOADED, (viewModel) => {
      this.cardViewModel = viewModel;
      const wrapper = document.getElementById("wrapper");
      const startMenu = document.getElementById("startMenu");
      const refToggle = document.getElementById("referenceToggle");
      utilities.show(wrapper);
      utilities.hide(startMenu);
      utilities.show(refToggle);
      if (this.cardViewModel.settings.honeybee) {
        const honeybeeRef = document.getElementById("honeybeeReference");
        honeybeeRef.classList.remove("d-none");
      }
    });
    document.addEventListener("click", (e) => {
      if (e.target && e.target.dataset && e.target.dataset.action) {
        const action = e.target.dataset.action;
        switch (action) {
          case "start":
            const refToggle = document.getElementById("referenceToggle");
            utilities.show(refToggle);
            this.cardViewModel.settings = this.cardViewModel.settings || {};
            if (this.cardViewModel.settings.honeybee) {
              this.cardViewModel.cards = this.cardViewModel.cards.concat(
                data.honeyBeeCards
              );
              const honeybeeRef = document.getElementById("honeybeeReference");
              honeybeeRef.classList.remove("d-none");
            }
            utilities.shuffle(this.cardViewModel.cards);
            const appContainer = document.getElementById("wrapper");
            const startMenuContainer = document.getElementById("startMenu");
            startMenuContainer.innerHTML = "";
            appContainer.classList.remove("d-none");
            break;
          case "setting":
            if (!this.cardViewModel.settings) {
              this.cardViewModel.settings = {};
            }
            this.cardViewModel.settings[e.target.dataset.setting] = true;
            break;
          default:
            break;
        }
      }
    });

    const completeState = "complete";
    const interval = setInterval((_) => {
      if (document.readyState === completeState) {
        const appContainer = document.getElementById("startMenu");
        appContainer.classList.remove("d-none");
        clearInterval(interval);
      }
    }, 1500);
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
    this.cardViewModel.cards = data.baseCards;
    utilities.shuffle(this.cardViewModel.cards);
  };
}
