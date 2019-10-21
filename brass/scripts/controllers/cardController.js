import utilities from "../../../scripts/shared/utilities.js";

import CardViewModel from "../viewModels/cardViewModel.js";
const cardViewModel = new CardViewModel();

export default class CardController {
  constructor(cards, cardView) {
    this.cardViewModel = cardViewModel;
    this.cardViewModel.cards = cards;
    utilities.shuffle(this.cardViewModel.cards);
    this.cardView = cardView;
    this.bindEventHandlers();
  }

  drawNextCard() {
    this.cardViewModel.drawnCards.push(this.cardViewModel.cards[this.cardViewModel.cards.length - 1]);
    this.updateCards();
  }

  updateCards() {
    this.cardViewModel.cards = this.cardViewModel.cards.filter(
      x => x.id != this.cardViewModel.currentCard.id
    );
  }

  updateView() {
    this.cardView.updateCardDisplay(this.cardViewModel);
  }

  bindEventHandlers() {
    document.addEventListener("click", e => {
      if (e.target && e.target.dataset && e.target.dataset.action) {
        const targetElement = e.target;
        const action = targetElement.dataset.action;
        if (action === "draw") {
          this.drawNextCard();
          this.updateView(this.cardViewModel);
        }
      }
    });
  }
}
