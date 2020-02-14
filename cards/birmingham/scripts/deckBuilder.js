import utilities from "../../../scripts/shared/utilities.js"

export default class DeckBuilder {
    constructor(cardViewModel){
        this.cardViewModel = cardViewModel;
    }
  getGroupCards = (group, numberOfCards) => {
    const groupCards = this.cardViewModel.cards.filter(x => x.group === group);
    const filteredGroupCards = [];
    utilities.shuffle(groupCards);
    for (let index = 0; index < numberOfCards; index++) {
      const card = groupCards[index];
      filteredGroupCards.push(card);
    }

    return filteredGroupCards;
  }

  removeSelectedCards = selectedCards => {
    for (let index = 0; index < selectedCards.length; index++) {
      const card = selectedCards[index];
      this.cardViewModel.cards = this.cardViewModel.cards.filter(
        x => x.id != card.id
      );
    }
  };

  buildDeck = () => {
    // I'm sure there's a way more flexible and efficient way to handle this,
    // but my brain is exhausted and I am just going to brute force it :)

    const firstTenCards = this.getFirstTenCards();
    const nextThreeCards = this.getNextThreeCards();
    const finalNineCards = this.getFinalNineCards();

    let cards = this.cardViewModel.cards;
    cards = cards.concat(finalNineCards);
    cards = cards.concat(nextThreeCards);
    cards = cards.concat(firstTenCards);

    this.cardViewModel.cards = cards;
  };

  getFirstTenCards = () => {
    let bottomTenCards = [];

    bottomTenCards = this.getGroupCards("a", 4);
    bottomTenCards = bottomTenCards.concat(this.getGroupCards("b", 3));
    bottomTenCards = bottomTenCards.concat(this.getGroupCards("c", 3));

    this.removeSelectedCards(bottomTenCards);

    utilities.shuffle(bottomTenCards);

    return bottomTenCards;
  };

  getNextThreeCards = () => {
    let nextThreeCards = [];

    nextThreeCards = this.getGroupCards("a", 1);
    nextThreeCards = nextThreeCards.concat(this.getGroupCards("b", 1));
    nextThreeCards = nextThreeCards.concat(this.getGroupCards("c", 1));

    this.removeSelectedCards(nextThreeCards);

    utilities.shuffle(nextThreeCards);

    return nextThreeCards;
  };

  getFinalNineCards = () => {
    const finalNine = [].concat(this.cardViewModel.cards);

    this.removeSelectedCards(finalNine);
    utilities.shuffle(finalNine);

    return finalNine;
  };
}
