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
    this.currentCardContainer.innerHTML = cardTemplateFactory.createCurrentCardTemplate(
      cardViewModel.currentCard
    );

    this.nextCardContainer.innerHTML = cardTemplateFactory.createNextCardTemplate(
      cardViewModel.nextCard
    );
  }
}
