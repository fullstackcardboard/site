import utilities from "../../../scripts/shared/utilities.js";

export default class DeckBuilder {
  constructor(cardViewModel) {
    this.cardViewModel = cardViewModel;
    this.round = 1;
    this.roundOneDeck = [];
    this.roundTwoDeck = [];
    this.roundThreeDeck = [];
    this.utilities = utilities;
    this.cardViewModel.showReshuffle = true;
  }

  removeSelectedCards = (selectedCards, arrayToRemoveFrom) => {
    for (let index = 0; index < selectedCards.length; index++) {
      let card = selectedCards[index];
      arrayToRemoveFrom = arrayToRemoveFrom.filter((x) => x.id != card.id);
    }
    return arrayToRemoveFrom;
  };

  deepCopy(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  reshuffle = () => {
    this.round++;
    if (this.round == 3) {
      const element = document.querySelector("[data-action=reshuffle]");
      element.parentNode.removeChild(element);
    }
    this.utilities.shuffle(this.cardViewModel.drawnCards);
    const roundDeck = this.round == 2 ? this.roundTwoDeck : this.roundThreeDeck;
    this.cardViewModel.cards = roundDeck.concat(
      this.cardViewModel.drawnCards.slice(0, 3)
    );
    this.utilities.shuffle(this.cardViewModel.cards);
    this.cardViewModel.drawnCards = [];
  };

  buildDecks = () => {
    this.commandCards = this.cardViewModel.cards.filter(
      (x) => x.group == "command"
    );
    this.cardViewModel.cards = this.removeSelectedCards(
      this.commandCards,
      this.cardViewModel.cards
    );
    this.utilities.shuffle(this.commandCards);

    this.excavateCards = this.cardViewModel.cards.filter(
      (x) => x.group == "excavate"
    );
    this.cardViewModel.cards = this.removeSelectedCards(
      this.excavateCards,
      this.cardViewModel.cards
    );
    this.utilities.shuffle(this.excavateCards);

    this.marketCards = this.cardViewModel.cards.filter(
      (x) => x.group == "market"
    );
    this.cardViewModel.cards = this.removeSelectedCards(
      this.marketCards,
      this.cardViewModel.cards
    );
    this.utilities.shuffle(this.marketCards);

    this.snipeCards = this.cardViewModel.cards.filter(
      (x) => x.group == "snipe"
    );
    this.cardViewModel.cards = this.removeSelectedCards(
      this.snipeCards,
      this.cardViewModel.cards
    );
    this.utilities.shuffle(this.snipeCards);

    this.surveyCards = this.cardViewModel.cards.filter(
      (x) => x.group == "survey"
    );
    this.cardViewModel.cards = this.removeSelectedCards(
      this.surveyCards,
      this.cardViewModel.cards
    );
    this.utilities.shuffle(this.surveyCards);

    this.sellCards = this.cardViewModel.cards.filter((x) => x.group == "sell");
    this.cardViewModel.cards = this.removeSelectedCards(
      this.sellCards,
      this.cardViewModel.cards
    );
    this.utilities.shuffle(this.sellCards);

    this.buildRoundOneDeck();

    this.buildRoundTwoDeck();

    this.buildRoundThreeDeck();

    this.cardViewModel.cards = this.roundOneDeck;
    this.utilities.shuffle(this.cardViewModel.cards);
  };

  buildRoundThreeDeck = () => {
    let roundThreeCommandCards = this.commandCards.slice(0, 3);
    this.commandCards = this.removeSelectedCards(
      roundThreeCommandCards,
      this.commandCards
    );
    let roundThreeExcavateCards = this.excavateCards.slice(0, 2);
    this.excavateCards = this.removeSelectedCards(
      roundThreeExcavateCards,
      this.excavateCards
    );
    let roundThreeSellCards = this.sellCards.slice(0, 2);
    this.sellCards = this.removeSelectedCards(
      roundThreeSellCards,
      this.sellCards
    );
    this.roundThreeDeck = roundThreeCommandCards.concat(
      roundThreeExcavateCards,
      roundThreeSellCards
    );
  };

  buildRoundTwoDeck = () => {
    let roundTwoCommandCards = this.commandCards.slice(0, 2);
    this.commandCards = this.removeSelectedCards(
      roundTwoCommandCards,
      this.commandCards
    );
    let roundTwoExcavateCards = this.excavateCards.slice(0, 3);
    this.excavateCards = this.removeSelectedCards(
      roundTwoExcavateCards,
      this.excavateCards
    );
    let roundTwoSellCards = this.sellCards.slice(0, 1);
    this.sellCards = this.removeSelectedCards(
      roundTwoSellCards,
      this.sellCards
    );
    let roundTwoSurveyCards = this.surveyCards.slice(0, 1);
    this.surveyCards = this.removeSelectedCards(
      roundTwoSurveyCards,
      this.surveyCards
    );
    this.roundTwoDeck = roundTwoCommandCards.concat(
      roundTwoExcavateCards,
      roundTwoSellCards,
      roundTwoSurveyCards
    );
  };

  buildRoundOneDeck = () => {
    let roundOneCommandCards = this.commandCards.slice(0, 1);
    this.commandCards = this.removeSelectedCards(
      roundOneCommandCards,
      this.commandCards
    );
    let roundOneExcavateCards = this.excavateCards.slice(0, 3);
    this.excavateCards = this.removeSelectedCards(
      roundOneExcavateCards,
      this.excavateCards
    );
    let roundOneMarketCards = this.marketCards.slice(0, 2);
    this.marketCards = this.removeSelectedCards(
      roundOneMarketCards,
      this.marketCards
    );
    let roundOneSellCards = this.sellCards.slice(0, 1);
    this.sellCards = this.removeSelectedCards(
      roundOneSellCards,
      this.sellCards
    );
    let roundOneSnipeCards = this.snipeCards.slice(0, 2);
    this.snipeCards = this.removeSelectedCards(
      roundOneSnipeCards,
      this.snipeCards
    );
    let roundOneSurveyCards = this.surveyCards.slice(0, 1);
    this.surveyCards = this.removeSelectedCards(
      roundOneSurveyCards,
      this.surveyCards
    );
    this.roundOneDeck = roundOneCommandCards.concat(
      roundOneExcavateCards,
      roundOneMarketCards,
      roundOneSellCards,
      roundOneSnipeCards,
      roundOneSurveyCards
    );
  };
}
