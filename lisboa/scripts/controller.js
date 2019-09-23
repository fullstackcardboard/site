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
  constructor(view, nobles, decks, actions) {
    const completeState = "complete";
    const interval = setInterval(_ =>  {
      if (document.readyState === completeState) {
        clearInterval(interval);
        this.firstTurn = true;
        this.view = view;
        this.nobles = nobles;
        this.decks = decks;
        this.actions = actions;
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
  }

  nextAction() {
    this.firstTurn = false;
    this.nextNoble();
    this.nextDeck();
    this.updateViewModel();
    this.view.updateView();
  }

  nextNoble() {
    this.currentNoble = this.nobles.filter(
      noble => noble.id === this.currentNoble.moveNext
    )[0];
  }

  nextDeck() {
    this.currentDeck = this.decks.filter(
      deck => deck.id === this.currentDeck.moveNext
    )[0];
  }
}
