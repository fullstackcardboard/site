import utilities from "../../../scripts/shared/utilities.js";
import ImageHandler from "../../scripts/helpers/imageHandler.js";
import events from "../events/cardEvents.js";

const imageHandler = new ImageHandler();

export default class CardController {
  constructor(
    cards,
    cardView,
    gameState,
    deckBuilderCallback,
    cardViewModel,
    reshuffleCallback,
    updateCallback,
    eventBus
  ) {
    this.cardViewModel = cardViewModel;
    this.gameState = gameState;
    this.deckBuilderCallback = deckBuilderCallback;
    this.reshuffleCallback = reshuffleCallback;
    this.updateCallback = updateCallback;
    this.eventBus = eventBus;

    const completeState = "complete";
    imageHandler.preloadCardImages(cards);
    const interval = setInterval((_) => {
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
        if (this.eventBus) {
          this.eventBus.subscribe(events.RESHUFFLE, () => {
            this.reshuffle();
          });
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

    this.cardViewModel.hideDrawnCards = false;
    this.cardViewModel.setTopDiscard = true;
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
        (x) => x.id != this.cardViewModel.currentCard.id
      );
    }

    if (
      this.cardViewModel.drawnCards.length > 1 &&
      this.cardViewModel.setTopDiscard
    ) {
      this.cardViewModel.topDiscard = this.cardViewModel.drawnCards[
        this.cardViewModel.drawnCards.length - 2
      ];
    }

    this.cardViewModel.deckEmpty = this.cardViewModel.cards.length === 0;
  }

  updateView() {
    this.cardView.updateCardDisplay(this.cardViewModel);
  }

  buildDeck() {
    this.deckBuilderCallback();
  }

  bindEventHandlers() {
    document.addEventListener("click", (e) => {
      if (e.target && e.target.dataset && e.target.dataset.action) {
        const targetElement = e.target;
        const action = targetElement.dataset.action;
        if (action === "draw") {
          this.drawNextCard();
          this.updateView(this.cardViewModel);
          this.gameState.set(this.cardViewModel);
          if (this.updateCallback) {
            this.updateCallback(this.cardViewModel);
          }
          if (this.eventBus) {
            this.eventBus.publish(
              events.CARD_DRAWN,
              this.cardViewModel.currentCard
            );
          }
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
          if (this.eventBus) {
            this.eventBus.publish(events.GAME_LOADED, this.cardViewModel);
          }
          if (this.updateCallback) {
            this.updateCallback(this.cardViewModel);
          }
          if (this.eventBus) {
            this.eventBus.publish(
              events.CARD_DRAWN,
              this.cardViewModel.currentCard
            );
          }
        } else if (action === "newGame") {
          this.gameState.clear();
          window.location.reload();
        } else if (action === "reshuffle") {
          this.reshuffle();
        }
      }
    });
  }

  reshuffle() {
    if (this.reshuffleCallback) {
      this.reshuffleCallback();
    } else {
      this.resetCards();
    }
    this.updateCards();
    this.updateView();
    this.gameState.set(this.cardViewModel);
    if (this.updateCallback) {
      this.updateCallback(this.cardViewModel);
    }
    if (this.eventBus) {
      this.eventBus.publish(events.RESHUFFLED);
    }
  }
}
