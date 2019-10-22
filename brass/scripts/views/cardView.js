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
    const nextCardImageContainer = document.getElementById(
      "nextCardImageContainer"
    );
    const currentCardImageContainer = document.getElementById(
      "currentCardImageContainer"
    );

    if (cardViewModel.era === "rail") {
      document
        .querySelectorAll("[data-canal]")
        .forEach(x => x.classList.add("d-none"));
    }

    const updateCards = () => {
      this.currentCardContainer.innerHTML = cardTemplateFactory.createCurrentCardTemplate(
        cardViewModel.currentCard
      );

      this.nextCardContainer.innerHTML = cardTemplateFactory.createNextCardTemplate(
        cardViewModel.nextCard
      );
    };

    if (nextCardImageContainer) {
      nextCardImageContainer.classList.add("slide-out-left");
      currentCardImageContainer.classList.add("slide-out-left");
      const timeOut = setTimeout(() => {
        updateCards();
        clearTimeout(timeOut);
      }, 300);
    } else {
      updateCards();
    }
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
