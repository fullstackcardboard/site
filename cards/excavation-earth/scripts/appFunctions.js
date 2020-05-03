import utilities from "../../../scripts/shared/utilities.js";

export default class AppFunctions {
  constructor(cardViewModel) {
    this.cardViewModel = cardViewModel;
    this.cardViewModel.round = 1;
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
    this.cardViewModel.round++;
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

  updateStats = (cardViewModel) => {
    const currentCardContainer = document.getElementById(
      "currentCardImageContainer"
    );
    const instructionsTrigger = document.getElementById("instructionsTrigger");
    if (instructionsTrigger) {
      instructionsTrigger.parentNode.removeChild(instructionsTrigger);
    }

    if (currentCardContainer) {
      currentCardContainer.insertAdjacentHTML(
        "beforeend",
        `<button
          class="btn btn-info btn-block mx-auto mt-1"
          style="width: 10vw"
          data-instructions="${cardViewModel.currentCard.group}"
        >
          <i
            class="fas fa-question"
            data-instructions="${cardViewModel.currentCard.group}"
          ></i>
        </button>`
      );
    }

    const statsContainer = document.getElementById("stats");
    switch (cardViewModel.round) {
      case 1:
        statsContainer.innerHTML = `<h2>Round One</h2>
          <div class="row text-light">
            <div class="col-sm-12 col-md-6 text-light">
              <h3>Deck Construction</h3>
              <table class="table text-light">
                <th>
                  <tr>
                    <td>
                      Card Type
                    </td>
                    <td>
                      Number
                    </td>
                  </tr>
                </th>
                <tbody>
                  <tr>
                    <td>
                      Command
                    </td>
                    <td>
                      1
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Excavate
                    </td>
                    <td>
                      3
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Market
                    </td>
                    <td>
                      2
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Sell
                    </td>
                    <td>
                      1
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Snipe
                    </td>
                    <td>
                      2
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Survey
                    </td>
                    <td>
                      1
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="col-sm-12 col-md-6 text-light">
              <h3>Cards Drawn</h3>
              ${this.getDrawnCardsHtml(cardViewModel)}
            </div>
          </div>`;
        break;
      case 2:
        statsContainer.innerHTML = `<h2>Round Two</h2>
          <div class="row text-light">
            <div class="col-sm-12 col-md-6 text-light">
              <h3>Deck Construction</h3>
              <table class="table text-light">
                <th>
                  <tr>
                    <td>
                      Card Type
                    </td>
                    <td>
                      Number
                    </td>
                  </tr>
                </th>
                <tbody>
                  <tr>
                    <td>
                      Command
                    </td>
                    <td>
                      2
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Excavate
                    </td>
                    <td>
                      3
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Sell
                    </td>
                    <td>
                      1
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Survey
                    </td>
                    <td>
                      1
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Carried Over From Last Round
                    </td>
                    <td>
                      3
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="col-sm-12 col-md-6 text-light">
              <h3>Cards Drawn</h3>
              ${this.getDrawnCardsHtml(cardViewModel)}
            </div>
          </div>`;
        break;
      case 3:
        statsContainer.innerHTML = `<h2>Round Three</h2>
          <div class="row text-light">
            <div class="col-sm-12 col-md-6 text-light">
              <h3>Deck Construction</h3>
              <table class="table text-light">
                <th>
                  <tr>
                    <td>
                      Card Type
                    </td>
                    <td>
                      Number
                    </td>
                  </tr>
                </th>
                <tbody>
                  <tr>
                    <td>
                      Command
                    </td>
                    <td>
                      3
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Excavate
                    </td>
                    <td>
                      2
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Sell
                    </td>
                    <td>
                      2
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Carried Over From Last Round
                    </td>
                    <td>
                      3
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="col-sm-12 col-md-6 text-light">
              <h3>Cards Drawn</h3>
              ${this.getDrawnCardsHtml(cardViewModel)}
            </div>
          </div>`;
        break;
      default:
        break;
    }
  };

  getDrawnCardsHtml = (cardViewModel) => {
    let drawnCardsTable = `
      <table class="table table-responsive">
        <th>
          <tr>
            <td class="text-light">Turn</td>
            <td class="text-light">Card</td>
          </tr>
        </th>
        <tbody>
    `;

    for (let index = 0; index < cardViewModel.drawnCards.length; index++) {
      const card = cardViewModel.drawnCards[index];
      drawnCardsTable += `<tr>
        <td class="text-light">${index + 1}</td>
        <td class="text-light">${
          card.group.charAt(0).toUpperCase() + card.group.slice(1)
        }</td>
      </tr>`;
    }

    drawnCardsTable += `</tbody></table>`;
    return drawnCardsTable;
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
    this.updateStats(this.cardViewModel);
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
