import Templates from "./templates.js";
import ImageHandler from "./imageHandler.js";
const imageHandler = new ImageHandler();

const templates = new Templates();

export default class View {
  constructor(viewModel) {
    this.viewModel = viewModel;
    this.gameContainer = document.getElementById("gameContainer");
    this.setupContainer = document.getElementById("setupContainer");
    this.modal = $("#modal");
    this.nextActionButton = document.getElementById("nextAction");
    this.loading = document.getElementById("loading");
    imageHandler.preload();
  }

  hideLoading() {
    this.loading.classList.add("d-none");
  }

  updateView() {
    if (!this.viewModel.firstTurn) {
      this.setupContainer.classList.add("d-none");
      this.gameContainer.classList.remove("d-none");
      this.nextActionButton.textContent = "Next Action";
    } else {
      document
        .getElementById("setupSteps")
        .insertAdjacentHTML(
          "beforeend",
          templates.getSetupHtml(this.viewModel.currentDeck)
        );
    }
    
    this.gameContainer.innerHTML = templates.getActionDisplay(
      this.viewModel.currentNobleAction,
      this.viewModel.currentStateAction
    );

    this.updateModalActionHtml();
  }

  updateModalActionHtml() {
    const actionHtml = templates.getActionHtml(this.viewModel.displayAction);
    document.getElementById("modalActionContainer").innerHTML = actionHtml;
  }

  showModal() {
    this.modal.modal("show");
  }
}
