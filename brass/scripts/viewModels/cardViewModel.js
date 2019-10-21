export default class CardViewModel {
  constructor() {
    this.cards = [];
    this.drawnCards = [];
  }

  get currentCard() {
    return this.drawnCards[this.drawnCards.length - 1];
  }

  get nextCard() {
    return this.cards[this.cards.length - 1];
  }

  get deckEmpty() {
    return this.cards.length == 0;
  }
}
