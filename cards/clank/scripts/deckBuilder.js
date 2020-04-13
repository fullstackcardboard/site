import utilities from "../../../scripts/shared/utilities.js";

export default class DeckBuilder {
  constructor(cardViewModel) {
    this.cardViewModel = cardViewModel;
  }

  buildDeck = () => {
    const initialDeck = this.cardViewModel.cards.filter(x => x.group === "a");
    const drawnCards = this.cardViewModel.cards.filter(x => x.group === "b");
    this.cardViewModel.drawnCards = drawnCards;
    this.cardViewModel.cards = initialDeck;
    utilities.shuffle(this.cardViewModel.cards);
    utilities.shuffle(this.cardViewModel.drawnCards);
    this.cardViewModel.showDiscardPile = true;
    this.cardViewModel.hideDrawnCards = true;
    this.cardViewModel.topDiscard = this.cardViewModel.drawnCards[
      this.cardViewModel.drawnCards.length - 1
    ];
  };
}
