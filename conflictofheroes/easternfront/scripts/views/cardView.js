import CardTemplateFactory from "../templates/cardTemplateFactory.js";

const cardTemplateFactory = new CardTemplateFactory();

export default class CardView {
  get currentCardContainer() {
    return document.getElementById("currentCard");
  }

  get nextCardContainer() {
    return document.getElementById("nextCard");
  }

  updateCardDisplay(cardViewModel) {
    this.toggleDrawButton(cardViewModel);

    this.currentCardContainer.innerHTML = cardTemplateFactory.createCurrentCardTemplate(
      cardViewModel.currentCard
    );
    this.nextCardContainer.innerHTML = cardTemplateFactory.createNextCardTemplate(
      cardViewModel.nextCard
    );
  }

  toggleDrawButton(cardViewModel) {
    const drawButton = document.querySelector("[data-action=draw]");
    if (cardViewModel.deckEmpty) {
      drawButton.classList.add("disabled");
      drawButton.disabled = true;
    } else {
      drawButton.classList.remove("disabled");
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
