import utilities from "../../../scripts/shared/utilities.js";
import CardViewModel from "../viewModels/cardViewModel.js";
import ImageHandler from "../../scripts/helpers/imageHandler.js";

const cardViewModel = new CardViewModel();
const imageHandler = new ImageHandler();

export default class CardController {
  constructor(cards, cardView) {
    this.cardViewModel = cardViewModel;

    const completeState = "complete";
    imageHandler.preloadCardImages(cards);
    const interval = setInterval(_ => {
      if (document.readyState === completeState) {
        clearInterval(interval);
        this.cardViewModel.cards = cards;
        this.buildDeck();
        this.cardView = cardView;
        this.bindEventHandlers();
        this.cardView.toggleLoadingVisibility();
        this.cardView.toggleAppVisibility();
        this.updateView();
        ``;
      }
    }, 1000);
  }

  drawNextCard() {
    if (this.cardViewModel.deckEmpty) {
      return;
    }

    this.cardViewModel.drawnCards.push(
      this.cardViewModel.cards[this.cardViewModel.cards.length - 1]
    );
    this.updateCards();
  }

  resetCards() {
    utilities.shuffle(this.cardViewModel.drawnCards);
    this.cardViewModel.cards = this.cardViewModel.cards.concat(
      utilities.deepCopy(this.cardViewModel.drawnCards)
    );
    this.cardViewModel.drawnCards = [];
  }

  updateCards() {
    this.cardViewModel.cards = this.cardViewModel.cards.filter(
      x => x.id != this.cardViewModel.currentCard.id
    );
  }

  updateView() {
    this.cardView.updateCardDisplay(this.cardViewModel);
  }

  getGroupCards(group, numberOfCards) {
    const groupCards = this.cardViewModel.cards.filter(x => x.group === group);
    const filteredGroupCards = [];
    utilities.shuffle(groupCards);
    for (let index = 0; index < numberOfCards; index++) {
      const card = groupCards[index];
      filteredGroupCards.push(card);
    }

    return filteredGroupCards;
  }

  removeSelectedCards(selectedCards) {
    for (let index = 0; index < selectedCards.length; index++) {
      const card = selectedCards[index];
      this.cardViewModel.cards = this.cardViewModel.cards.filter(
        x => x.id != card.id
      );
    }
  }

  buildDeck() {
    // I'm sure there's a way more flexible and efficient way to handle this,
    // but my brain is exhausted and I am just going to brute force it :)

    const bottomTenCards = this.getBottomTenCards();
    const nextThreeCards = this.getNextThreeCards();
    const finalNineCards = this.getFinalNineCards();

    let cards = this.cardViewModel.cards;
    cards = cards.concat(bottomTenCards);
    cards = cards.concat(nextThreeCards);
    cards = cards.concat(finalNineCards);

    this.cardViewModel.cards = cards;
  }

  getBottomTenCards() {
    let bottomTenCards = [];

    bottomTenCards = this.getGroupCards("a", 4);
    bottomTenCards = bottomTenCards.concat(this.getGroupCards("b", 3));
    bottomTenCards = bottomTenCards.concat(this.getGroupCards("c", 3));

    this.removeSelectedCards(bottomTenCards);

    utilities.shuffle(bottomTenCards);

    return bottomTenCards;
  }

  getNextThreeCards() {
    let nextThreeCards = [];

    nextThreeCards = this.getGroupCards("a", 1);
    nextThreeCards = nextThreeCards.concat(this.getGroupCards("b", 1));
    nextThreeCards = nextThreeCards.concat(this.getGroupCards("c", 1));

    this.removeSelectedCards(nextThreeCards);

    utilities.shuffle(nextThreeCards);

    return nextThreeCards;
  }

  getFinalNineCards() {
    const finalNine = [].concat(this.cardViewModel.cards);

    this.removeSelectedCards(finalNine);
    utilities.shuffle(finalNine);

    return finalNine;
  }

  bindEventHandlers() {
    document.addEventListener("click", e => {
      if (e.target && e.target.dataset && e.target.dataset.action) {
        const targetElement = e.target;
        const action = targetElement.dataset.action;
        if (action === "draw") {
          this.drawNextCard();
          this.updateView(this.cardViewModel);
        } else if (action === "railEra") {
          this.resetCards();
          this.buildDeck();
          this.cardViewModel.era = "rail";
          this.updateView();
        }
      }
    });
  }
}
