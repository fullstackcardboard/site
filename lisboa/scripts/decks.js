class Deck {
  constructor(id, title, moveNext, stateAction) {
    this.id = id;
    this.title = title;
    this.moveNext = moveNext;
    this.stateAction = stateAction;
  }
}

const builderDeck = new Deck(
  "builder",
  "Builder Deck",
  "minister",
  "bottomStateAction"
);
const ministerDeck = new Deck(
  "minister",
  "Minister Deck",
  "king",
  "bottomStateAction"
);
const kingDeck = new Deck("king", "King Deck", "treasury", "topStateAction");
const treasuryDeck = new Deck(
  "treasury",
  "Treasury Deck",
  "builder",
  "topStateAction"
);

const decks = [builderDeck, ministerDeck, kingDeck, treasuryDeck];

export default decks;
