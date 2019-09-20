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
    this.modal = $("#modal");
    this.currentActionButton = document.getElementById("currentAction");
  }

  updateView() {
    if (!this.viewModel.firstTurn) {
      this.showModal();
      this.setupContainer.classList.add("d-none");
      this.currentActionButton.classList.remove("disabled");
      this.currentActionButton.disabled = false;
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
  showModal() {
    this.modal.modal("show");
  }
}
