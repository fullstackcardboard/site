import ImageHandler from "./imageHandler.js";

function setupNobles(nobles, actions) {
  for (let index = 0; index < nobles.length; index++) {
    const noble = nobles[index];
    noble.nobleAction = actions.nobleActions.filter(
      action => action.id === noble.id
    )[0];
    noble.bottomStateAction = actions.stateActions.filter(
      action => action.id === noble.bottomStateActionId
    )[0];
    noble.topStateAction = actions.stateActions.filter(
      action => action.id === noble.topStateActionId
    )[0];
  }
}

const imageHandler = new ImageHandler();

export default class Controller {
  constructor(view, nobles, decks, actions, stepManager, gameState) {
    const completeState = "complete";
    imageHandler.preload();
    const interval = setInterval(_ => {
      if (document.readyState === completeState) {
        clearInterval(interval);
        this.view = view;
        this.viewModel = this.view.viewModel;
        this.nobles = nobles;
        this.decks = decks;
        this.actions = actions;
        this.stepManager = stepManager;
        this.gameState = gameState;
        setupNobles(this.nobles, this.actions);
        this.viewModel.currentDeck =
          decks[Math.floor(Math.random() * this.decks.length)];
        this.viewModel.currentNoble =
          nobles[Math.floor(Math.random() * this.nobles.length)];
        this.view.updateView();
        this.view.hideLoading();
        this.bindEventHandlers();
        if (this.gameState.getSavedState()) {
          this.view.showLoadGameModal();
        }
      }
    }, 1000);
  }

  bindEventHandlers() {
    document.addEventListener("click", event => {
      if (
        (event.target && event.target.dataset && event.target.dataset.action) ||
        (event.target.parentElement &&
          event.target.parentElement.dataset &&
          event.target.parentElement.dataset.action)
      ) {
        const targetElement = event.target.dataset.action
          ? event.target
          : event.target.parentElement;
        const action = targetElement.dataset.action;
        this.handleClick(action, targetElement);
      }
    });
  }

  handleClick(action, targetElement) {
    if (action === "nextAction") {
      this.nextAction();
      this.gameState.set(this.view.viewModel);
    } else if (action === "displayAction") {
      this.displayAction(targetElement);
      this.gameState.set(this.view.viewModel);
    } else if (action === "nextDeck") {
      this.nextDeck();
      this.view.updateView();
      this.gameState.set(this.view.viewModel);
    } else if (action === "skipDeck") {
      this.skipDeck();
      this.handleStep();
      this.gameState.set(this.view.viewModel);
    } else if (action === "step") {
      const stepTo = targetElement.dataset.stepTo;
      this.view.viewModel.currentStep = stepTo;
      this.handleStep();
      this.gameState.set(this.view.viewModel);
    } else if (action === "load") {
      this.loadGame();
    } else if (action === "new") {
      this.gameState.clear();
      window.location.reload();
    } else if (action === "clear") {
      this.gameState.clear();
    }
  }

  displayAction(targetElement) {
    const actionId = targetElement.dataset.actionId;
    let displayAction = this.actions.nobleActions.filter(
      x => x.id === actionId
    )[0];
    if (!displayAction) {
      displayAction = this.actions.stateActions.filter(
        x => x.id === actionId
      )[0];
    }
    this.viewModel.displayAction = displayAction;
    this.view.updateView();
    this.view.showModal();
  }

  getCurrentNobleAction = () => {
    const viewModel = this.view.viewModel;
    return viewModel.currentNoble.nobleAction;
  };

  getCurrentStateAction = () => {
    const viewModel = this.view.viewModel;
    const stateAction =
      viewModel.currentNoble[viewModel.currentDeck.stateAction];
    if (!stateAction) {
      console.log(
        `${viewModel.currentNoble.id} does not have a ${this.currentDeck.stateAction}`
      );
    }

    return stateAction;
  };

  nextAction() {
    this.viewModel.movedDecks = false;
    this.nextNoble();
    this.view.viewModel.currentStep = "courtier";
    this.handleStep();
  }

  nextNoble() {
    this.viewModel.currentNoble = this.nobles.filter(
      noble => noble.id === this.viewModel.currentNoble.moveNext
    )[0];
  }

  nextDeck() {
    this.viewModel.previousDeck = JSON.parse(JSON.stringify(this.viewModel.currentDeck));
    this.viewModel.currentDeck = this.decks.filter(
      deck => deck.id === this.viewModel.currentDeck.moveNext
    )[0];
  }

  skipDeck() {
    this.viewModel.currentDeck = this.decks.filter(
      deck => deck.id === this.viewModel.currentDeck.moveNext
    )[0];
  }

  loadGame() {
    this.view.viewModel = this.gameState.getSavedState();
    this.viewModel = this.view.viewModel;
    this.viewModel.currentNobleAction = this.getCurrentNobleAction();
    this.viewModel.currentStateAction = this.getCurrentStateAction();
    const template = this.stepManager.handle(
      this.viewModel.currentStep,
      this.viewModel
    );
    this.view.updateView(template);
  }

  handleStep() {
    this.viewModel.firstTurn = false;
    if (this.view.viewModel.currentStep === "moveDeck" && !this.viewModel.movedDecks) {
      this.viewModel.movedDecks = true;
      this.nextDeck();
    }

    this.viewModel.currentNobleAction = this.getCurrentNobleAction();
    this.viewModel.currentStateAction = this.getCurrentStateAction();
    const template = this.stepManager.handle(
      this.view.viewModel.currentStep,
      this.view.viewModel
    );
    this.view.updateView(template);
  }
}
