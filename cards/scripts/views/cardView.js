import CardTemplateFactory from "../templates/cardTemplateFactory.js";

const cardTemplateFactory = new CardTemplateFactory();

export default class CardView {
  get currentCardContainer() {
    return document.getElementById("currentCard");
  }

  get nextCardContainer() {
    return document.getElementById("nextCard");
  }

  get discardPileContainer() {
    return document.getElementById("discardPile");
  }

  updateCardDisplay(cardViewModel) {
    this.toggleDrawButton(cardViewModel);
    this.hideRailEraButton(cardViewModel);

    // This is a hack until I refactor this functionality
    if (
      cardViewModel.deckEmpty &&
      cardViewModel.era &&
      cardViewModel.era === "rail"
    ) {
      const newGameButton = document.querySelector("[data-action='newGame']");
      if (newGameButton) {
        newGameButton.classList.remove("d-none");
      }
    } else if (cardViewModel.deckEmpty) {
      const newGameButton = document.querySelector("[data-action='newGame']");
      if (newGameButton) {
        newGameButton.classList.remove("d-none");
      }
    }

    if (!cardViewModel.hideDrawnCards) {
      this.currentCardContainer.innerHTML = cardTemplateFactory.createCurrentCardTemplate(
        cardViewModel.currentCard
      );
    }
    if (cardViewModel.showDiscardPile && cardViewModel.topDiscard) {
      this.discardPileContainer.innerHTML = cardTemplateFactory.createDiscardPileTemplate(
        cardViewModel.topDiscard
      );
    }

    this.nextCardContainer.innerHTML = cardTemplateFactory.createNextCardTemplate(
      cardViewModel.nextCard
    );
  }

  hideRailEraButton(cardViewModel) {
    if (cardViewModel.era === "rail") {
      document
        .querySelectorAll("[data-canal]")
        .forEach((x) => x.classList.add("d-none"));
    }
  }

  toggleDrawButton(cardViewModel) {
    const drawButton = document.querySelector("[data-action=draw]");
    const reshuffleButton = document.querySelector("[data-action=reshuffle]");
    if (cardViewModel.deckEmpty) {
      drawButton.classList.add("disabled");
      drawButton.disabled = true;
      if (reshuffleButton && !cardViewModel.showReshuffle) {
        reshuffleButton.classList.remove("d-none");
      }
    } else {
      drawButton.classList.remove("disabled");
      if (reshuffleButton && !cardViewModel.showReshuffle) {
        reshuffleButton.classList.add("d-none");
      }
      drawButton.disabled = false;
    }
  }

  showLoadGameModal() {
    const modal = $("#loadModal");
    modal.modal("show");
  }

  toggleLoadingVisibility() {
    const loadingContainer = document.getElementById("loading");

    if (loadingContainer.classList.contains("d-none")) {
      loadingContainer.classList.remove("d-none");
    } else {
      loadingContainer.classList.add("d-none");
    }
  }

  toggleAppVisibility() {
    const appContainer = document.getElementById("app");
    if (appContainer.classList.contains("d-none")) {
      appContainer.classList.remove("d-none");
    } else {
      appContainer.classList.add("d-none");
    }
  }
}
