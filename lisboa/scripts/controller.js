function setupNobles(nobles, actions) {
  for (let index = 0; index < nobles.length; index++) {
    const noble = nobles[index];
    noble.nobleAction = actions.nobleActions.filter(
      action => action.id === noble.id
    )[0];
    noble.bottomStateAction = actions.stateActions.filter(
      action => action.id === noble.bottomStateAction
    )[0];
    noble.topStateAction = actions.stateActions.filter(
      action => action.id === noble.topStateAction
    )[0];
  }
}

export default class Controller {
  constructor(view, nobles, decks, actions) {
    this.view = view;
    this.nobles = nobles;
    this.decks = decks;
    this.actions = actions;
    setupNobles(this.nobles, this.actions);
    this.currentDeck = decks[Math.floor(Math.random() * this.decks.length)];
    this.currentNoble = nobles[Math.floor(Math.random() * this.nobles.length)];
    this.currentNoble.bottomStateAction = this.updateViewModel();
    this.bindEventHandlers();
  }

  bindEventHandlers() {
    document.addEventListener("click", event => {
      if (event.target && event.target.dataset && event.target.dataset.action) {
        const targetElement = event.target;
        const action = targetElement.dataset.action;
        this.handleClick(action);
      }
    });
  }

  handleClick(action) {
    if (action === "nextAction") {
      this.nextAction();
    }
  }

  updateViewModel() {
    this.view.viewModel.currentNoble = this.currentNoble;
    this.view.viewModel.currentDeck = this.currentDeck;
    this.view.viewModel.nextNoble = this.nobles.filter(
      noble => noble.id === this.view.viewModel.currentNoble.moveNext
    )[0];
    this.view.viewModel.nextDeck = this.decks.filter(
      deck => deck.id === this.currentDeck.moveNext
    )[0];
    this.view.updateView();
  }

  nextAction() {
    this.nextNoble();
    this.nextDeck();
    this.updateViewModel();
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
