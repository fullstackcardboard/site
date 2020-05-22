import utilities from "../../../scripts/shared/utilities.js";
import getCurrentMission from "./missions.js";
import events from "../../scripts/events/cardEvents.js";

export default class AppFunctions {
  constructor(cardViewModel, eventBus) {
    this.cardViewModel = cardViewModel;
    this.cardViewModel.round = 1;
    this.utilities = utilities;
    this.cardViewModel.showReshuffle = true;

    eventBus.subscribe(events.RESHUFFLED, () => {
      const draw = document.getElementById("draw");
      draw.classList.remove("d-none");
    });

    document.addEventListener("click", (e) => {
      const target = e.target;
      if (
        target &&
        target.dataset.action &&
        target.dataset.action == "destroy"
      ) {
        const messageContainer = document.getElementById("message");
        const commandCards = this.cardViewModel.cards.filter(
          (x) => x.instructions == "command"
        );
        if (commandCards.length <= 1) {
          messageContainer.innerHTML = `<p class="badge-dark text-center col col-sm-6 mx-auto">No command cards removed from game.</p>`;
          return;
        } else {
          const commandCardToRemove = [commandCards[0]];
          this.cardViewModel.cards = this.removeSelectedCards(
            commandCardToRemove,
            this.cardViewModel.cards
          );
          eventBus.publish(events.RESHUFFLE);
          messageContainer.innerHTML = `<p class="badge-dark text-center col col-sm-6 mx-auto">Command card: ${commandCards[0].id} removed from game.</p>`;
        }

        const timeout = setTimeout(() => {
          messageContainer.innerHTML = "";
          clearTimeout(timeout);
        }, 3000);
      }
    });
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
