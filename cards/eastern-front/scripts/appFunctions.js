import utilities from "../../../scripts/shared/utilities.js";
import getCurrentMission from "./missions.js";
import events from "../../scripts/events/cardEvents.js";
import cards from "./data.js";

export default class AppFunctions {
  constructor(cardViewModel, eventBus) {
    this.cardViewModel = cardViewModel;
    this.cardViewModel.round = 1;
    this.utilities = utilities;
    this.cardViewModel.showReshuffle = true;
    this.defenseCardsAdded = 0;

    eventBus.subscribe(events.RESHUFFLED, () => {
      const draw = document.getElementById("draw");
      draw.classList.remove("d-none");
    });

    document.addEventListener("click", (e) => {
      const target = e.target;
      if (target && target.dataset.action) {
        switch (target.dataset.action) {
          case "destroy":
            const commandCards = this.cardViewModel.cards.filter((x) =>
              x.instructions.includes("command")
            );
            if (commandCards.length <= 1) {
              this.setMessage(
                `<p class="badge-dark text-center col col-sm-6 mx-auto">No command cards removed from game.</p>`
              );
              return;
            } else {
              const commandCardToRemove = [commandCards[0]];
              this.cardViewModel.commandCardsRemoved
                ? this.cardViewModel.commandCardsRemoved.push(
                    commandCardToRemove
                  )
                : (this.cardViewModel.commandCardsRemoved = [
                    commandCardToRemove,
                  ]);
              this.cardViewModel.cards = this.removeSelectedCards(
                commandCardToRemove,
                this.cardViewModel.cards
              );
              eventBus.publish(events.RESHUFFLE);
              this.setMessage(
                `<p class="badge-dark text-center col col-sm-6 mx-auto">Command card: ${commandCards[0].id} removed from game.</p>`
              );
            }

            break;
          case "add-command":
            if (!this.cardViewModel.commandCardsRemoved) {
              this.setMessage(
                `<p class="badge-dark text-center col col-sm-6 mx-auto">No Command Cards available to shuffle in.</p>`
              );
              return;
            }
            let numberOfCardsAdded = 0;
            for (let index = 0; index < 2; index++) {
              const cardToAdd = this.cardViewModel.commandCardsRemoved[index];
              cardToAdd
                ? () => {
                    this.cardViewModel.cards.push(cardToAdd);
                    numberOfCardsAdded++;
                  }
                : () => {};
            }

            document.getElementById("commandContainer").classList.add("d-none");
            this.setMessage(
              `<p class="badge-dark text-center col col-sm-6 mx-auto">Shuffled in ${numberOfCardsAdded} Command Cards.</p>`
            );
            break;
          case "defense":
            const defenseCards
            break;
          default:
            break;
        }
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

  setMessage = (message) => {
    const messageContainer = document.getElementById("message");
    messageContainer.innerHTML = message;
    const timeout = setTimeout(() => {
      messageContainer.innerHTML = "";
      clearTimeout(timeout);
    }, 3000);
  };
}
