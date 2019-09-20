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
    this.viewModel = viewModel;
    this.gameContainer = document.getElementById("gameContainer");
    this.setupContainer = document.getElementById("setupContainer");
  }

  updateView() {
    if (this.viewModel.firstTurn) {
      this.gameContainer.classList.add("d-none");
    } else {
      this.setupContainer.classList.add("d-none");
      this.gameContainer.classList.remove("d-none");
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
