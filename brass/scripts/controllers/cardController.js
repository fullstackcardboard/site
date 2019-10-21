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
        utilities.shuffle(this.cardViewModel.cards);
        this.cardView = cardView;
        this.bindEventHandlers();
        this.cardView.toggleLoadingVisibility();
        this.cardView.toggleAppVisibility();
      }
    }, 1000);
  }

  drawNextCard() {
    if (this.cardViewModel.deckEmpty) {
      this.resetCards();
    }

    this.cardViewModel.drawnCards.push(
      this.cardViewModel.cards[this.cardViewModel.cards.length - 1]
    );
    this.updateCards();
  }

  resetCards() {
    utilities.shuffle(this.cardViewModel.drawnCards);
    this.cardViewModel.cards = utilities.deepCopy(
      this.cardViewModel.drawnCards
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

  bindEventHandlers() {
    document.addEventListener("click", e => {
      if (e.target && e.target.dataset && e.target.dataset.action) {
        const targetElement = e.target;
        const action = targetElement.dataset.action;
        if (action === "draw") {
          this.drawNextCard();
          this.updateView(this.cardViewModel);
        }
      }
    });
  }
}
