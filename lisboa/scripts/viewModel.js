export default class ViewModel {
  constructor() {
    this.firstTurn = true;
    this.movedDecks = false;
    this.currentNoble = null;
    this.currentDeck = null;
    this.currentNobleAction = null;
    this.currentStateAction = null;
    this.previousDeck = null;
    this.modalAction = null;
    this.currentStep = "";
  }
}
