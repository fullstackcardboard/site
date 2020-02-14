import utilites from "../../../scripts/shared/utilities.js";

export default class DeckBuilder {
  constructor(cardViewModel) {
    this.cardViewModel = cardViewModel;
  }

  buildDeck = () => {
    const easyCards = this.cardViewModel.cards.filter(x => x.group === "easy");
    utilites.shuffle(easyCards);
    const easyCardsToIncludeInDeck = easyCards.slice(0, 2);

    const difficultCards = this.cardViewModel.cards.filter(
      x => x.group === "difficult"
    );
    utilites.shuffle(difficultCards);
    const difficultCardsToIncludeInDeck = difficultCards.slice(0, 7);

    const fullDeck = easyCardsToIncludeInDeck.concat(
      difficultCardsToIncludeInDeck
    );
    utilites.shuffle(fullDeck);

    this.cardViewModel.cards = fullDeck;
  };
}
