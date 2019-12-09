import utilities from "../../../scripts/shared/utilities.js";
import CardViewModel from "../viewModels/cardViewModel.js";
import ImageHandler from "../../scripts/helpers/imageHandler.js";

const cardViewModel = new CardViewModel();
const imageHandler = new ImageHandler();

export default class CardController {
  constructor(cards, cardView, gameState) {
    this.cardViewModel = cardViewModel;
    this.gameState = gameState;

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
        this.updateCards();
        this.updateView();
        if (this.gameState.getSavedState()) {
          this.cardView.showLoadGameModal();
        }
      }
    }, 1000);
  }

  drawNextCard() {
    this.cardViewModel.drawnCards.push(
      this.cardViewModel.cards[this.cardViewModel.cards.length - 1]
    );

    this.updateCards();
    if (this.cardViewModel.deckEmpty) {
      this.cardViewModel.nextCard = null;
    }
  }

  resetCards() {
    utilities.shuffle(this.cardViewModel.drawnCards);
    this.cardViewModel.cards = this.cardViewModel.cards.concat(
      utilities.deepCopy(this.cardViewModel.drawnCards)
    );
    this.cardViewModel.drawnCards = [];
  }

  updateCards() {
    // currentCard & nextCard were originally computed in the viewmodel,
    // but local storage wipes out functions defined on objects.
    // So, they're now set here.
    this.cardViewModel.currentCard = this.cardViewModel.drawnCards[
      this.cardViewModel.drawnCards.length - 1
    ];
    this.cardViewModel.nextCard = this.cardViewModel.cards[
      this.cardViewModel.cards.length - 1
    ];

    if (this.cardViewModel.currentCard) {
      this.cardViewModel.cards = this.cardViewModel.cards.filter(
        x => x.id != this.cardViewModel.currentCard.id
      );
    }

    this.cardViewModel.deckEmpty = this.cardViewModel.cards.length === 0;
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

    const firstTenCards = this.getFirstTenCards();
    const nextThreeCards = this.getNextThreeCards();
    const finalNineCards = this.getFinalNineCards();

    let cards = this.cardViewModel.cards;
    cards = cards.concat(finalNineCards);
    cards = cards.concat(nextThreeCards);
    cards = cards.concat(firstTenCards);

    this.cardViewModel.cards = cards;
  }

  getFirstTenCards() {
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
          this.gameState.set(this.cardViewModel);
        } else if (action === "railEra") {
          this.resetCards();
          this.buildDeck();
          this.updateCards();
          this.cardViewModel.era = "rail";
          this.updateView();
          this.gameState.set(this.cardViewModel);
        } else if (action === "load") {
          this.cardViewModel = this.gameState.getSavedState();
          this.updateView();
        } else if (action === "newGame") {
          this.gameState.clear();
          window.location.reload();
        }
      }
    });
  }
}
