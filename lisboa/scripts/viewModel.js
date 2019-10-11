export default class ViewModel {
  constructor() {
    this.currentNoble = null;
    this.currentDeck = null;
    this.previousDeck = null;
    this.modalAction = null;
    this.currentStep = "";
  }

  get currentStateAction() {
    const stateAction = this.currentNoble[this.currentDeck.stateAction];
    if (!stateAction) {
      console.log(
        `${this.currentNoble.id} does not have a ${this.currentDeck.stateAction}`
      );
    }

    return stateAction;
  }

  get currentNobleAction() {
    return this.currentNoble.nobleAction;
  }
}
