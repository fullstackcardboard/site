export default class ViewModel {
  constructor() {
    this.currentNoble = null;
    this.nextNoble = null;
    this.currentDeck = null;
    this.nextDeck = null;
  }

  get currentStateAction() {
    return this.currentNoble[this.currentDeck.stateAction];
  }

  get currentNobleAction() {
    return this.currentNoble.nobleAction;
  }
}
