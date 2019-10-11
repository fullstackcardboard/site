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

export default class Controller {
  constructor(view, nobles, decks, actions, stepHandler) {
    const completeState = "complete";
    const interval = setInterval(_ => {
      if (document.readyState === completeState) {
        clearInterval(interval);
        this.firstTurn = true;
        this.movedDecks = false;
        this.view = view;
        this.nobles = nobles;
        this.decks = decks;
        this.actions = actions;
        this.stepHandler = stepHandler;
        setupNobles(this.nobles, this.actions);
        this.currentDeck = decks[Math.floor(Math.random() * this.decks.length)];
        this.currentNoble =
          nobles[Math.floor(Math.random() * this.nobles.length)];
        this.updateViewModel();
        this.view.updateView();
        this.view.hideLoading();
        this.bindEventHandlers();
      }
    }, 1000);
  }

  bindEventHandlers() {
    document.addEventListener("click", event => {
      if (event.target && event.target.dataset && event.target.dataset.action) {
        const targetElement = event.target;
        const action = targetElement.dataset.action;
        this.handleClick(action, targetElement);
      }
    });
  }

  handleClick(action, targetElement) {
    if (action === "nextAction") {
      this.nextAction();
    } else if (action === "displayAction") {
      this.displayAction(targetElement);
    } else if (action === "nextDeck") {
      this.nextDeck();
      this.updateViewModel();
      this.view.updateView();
    } else if (action === "skipDeck") {
      this.nextDeck();
      this.handleStep();
    } else if (action === "step") {
      const stepTo = targetElement.dataset.stepTo;
      this.view.viewModel.currentStep = stepTo;
      this.handleStep();
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
  }

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

  handleStep() {
    this.firstTurn = false;
    if (this.view.viewModel.currentStep === "moveDeck" && !this.movedDecks) {
      this.movedDecks = true;
      this.nextDeck();
      this.updateViewModel();
    }
    this.updateViewModel();
    const template = this.stepHandler.handle(
      this.view.viewModel.currentStep,
      this.view.viewModel
    );
    this.view.updateView(template);
  }
}
