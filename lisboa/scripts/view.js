import Templates from "./templates.js";

function updateTreasuryDeckPositionHtml(treasuryDeckHtml) {
  document.getElementById(
    "treasuryDeckPositionContainer"
  ).innerHTML = treasuryDeckHtml;
}

function updateNoblePositionElementHtml(noblePositionHtml) {
  document.getElementById(
    "noblePositionContainer"
  ).innerHTML = noblePositionHtml;
}

function updateStateActionElement(stateActionHtml) {
  document.getElementById("stateActionContainer").innerHTML = stateActionHtml;
}

function updateNobleActionElement(nobleActionHtml) {
  document.getElementById("nobleActionContainer").innerHTML = nobleActionHtml;
}

const templates = new Templates();

export default class View {
  constructor(viewModel) {
    this.viewModel = new Proxy(viewModel, {
      set: (target, property, value) => {
        target[property] = value;
        this.updateView();
        return true;
      }
    });
  }

  updateView() {
    // Make sure no properties are null/undefined before executing update.
    for (const key in this.viewModel) {
      if (this.viewModel.hasOwnProperty(key)) {
        const value = this.viewModel[key];
        if (!value) {
          return;
        }
      }
    }
    updateStateActionElement(
      templates.getActionHtml(this.viewModel.currentStateAction)
    );
    updateNobleActionElement(
      templates.getActionHtml(this.viewModel.currentNobleAction)
    );
    updateNoblePositionElementHtml(
      templates.getNoblePositionHtml(
        this.viewModel.currentNoble,
        this.viewModel.nextNoble
      )
    );
    updateTreasuryDeckPositionHtml(
      templates.getTreasuryDeckHtml(
        this.viewModel.currentDeck,
        this.viewModel.nextDeck
      )
    );
  }
}
