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
        this.firstTurn = true;
        this.movedDecks = false;
        this.view = view;
        this.nobles = nobles;
        this.decks = decks;
        this.actions = actions;
        this.stepManager = stepManager;
        this.gameState = gameState;
        setupNobles(this.nobles, this.actions);
        this.currentDeck = decks[Math.floor(Math.random() * this.decks.length)];
        this.currentNoble =
          nobles[Math.floor(Math.random() * this.nobles.length)];
        this.updateViewModel();
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
      this.updateViewModel();
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
      this.view.viewModel = this.gameState.getSavedState();
      this.firstTurn = false;
      this.updateViewModel();
      this.handleStep();
      this.gameState.set(this.view.viewModel);
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
    this.view.viewModel.displayAction = displayAction;
    this.view.updateView();
    this.view.showModal();
  }

  updateViewModel() {
    this.view.viewModel.firstTurn = this.firstTurn;
    this.view.viewModel.currentNoble = this.currentNoble;
    this.view.viewModel.currentDeck = this.currentDeck;
    this.view.viewModel.previousDeck = this.previousDeck;
    this.view.viewModel.currentNobleAction = this.getCurrentNobleAction();
    this.view.viewModel.currentStateAction = this.getCurrentStateAction();
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
    this.movedDecks = false;
    this.nextNoble();
    this.view.viewModel.currentStep = "courtier";
    this.handleStep();
  }

  nextNoble() {
    this.currentNoble = this.nobles.filter(
      noble => noble.id === this.currentNoble.moveNext
    )[0];
  }

  nextDeck() {
    this.previousDeck = JSON.parse(JSON.stringify(this.currentDeck));
    this.currentDeck = this.decks.filter(
      deck => deck.id === this.currentDeck.moveNext
    )[0];
  }

  skipDeck() {
    this.currentDeck = this.decks.filter(
      deck => deck.id === this.currentDeck.moveNext
    )[0];
  }
  handleStep() {
    this.firstTurn = false;
    if (this.view.viewModel.currentStep === "moveDeck" && !this.movedDecks) {
      this.movedDecks = true;
      this.nextDeck();
      this.updateViewModel();
    }
    this.updateViewModel();
    const template = this.stepManager.handle(
      this.view.viewModel.currentStep,
      this.view.viewModel
    );
    this.view.updateView(template);
  }
}
