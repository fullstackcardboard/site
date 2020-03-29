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
    this.cardViewModel.hideDrawnCards = true;
  };
}
