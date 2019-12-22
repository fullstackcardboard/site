import utilities from "../../../../scripts/shared/utilities.js";
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
        utilities.shuffle(cards);
        this.cardViewModel.cards = cards;
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
    utilities.shuffle(this.cardViewModel.cards);
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

  bindEventHandlers() {
    document.addEventListener("click", e => {
      if (e.target && e.target.dataset && e.target.dataset.action) {
        const targetElement = e.target;
        const action = targetElement.dataset.action;
        if (action === "draw") {
          this.drawNextCard();
          this.updateView(this.cardViewModel);
          this.gameState.set(this.cardViewModel);
        } else if (action === "shuffle") {
          this.resetCards();
          this.updateCards();
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
