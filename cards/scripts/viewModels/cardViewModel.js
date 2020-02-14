export default class CardViewModel {
  constructor() {
    this.cards = [];
    this.drawnCards = [];
    this.currentCard = null;
    this.nextCard = null;
    this.deckEmpty = false;
  }
}
