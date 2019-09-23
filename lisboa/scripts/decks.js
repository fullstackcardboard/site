class Deck {
  constructor(id, title, moveNext, stateAction, image) {
    this.id = id;
    this.title = title;
    this.moveNext = moveNext;
    this.stateAction = stateAction;
    this.image = image;
  }
}

const builderDeck = new Deck(
  "builder",
  "Builder Deck",
  "minister",
  "bottomStateAction",
  "builder_deck.png"
);
const ministerDeck = new Deck(
  "minister",
  "Minister Deck",
  "king",
  "bottomStateAction",
  "marquis_deck.png"
);
const kingDeck = new Deck(
  "king",
  "King Deck",
  "treasury",
  "topStateAction",
  "king_deck.png"
);
const treasuryDeck = new Deck(
  "treasury",
  "Treasury Deck",
  "builder",
  "topStateAction",
  "treasury_deck.png"
);

const decks = [builderDeck, ministerDeck, kingDeck, treasuryDeck];

export default decks;
