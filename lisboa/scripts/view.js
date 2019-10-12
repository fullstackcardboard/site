import Templates from "./templates.js";

const templates = new Templates();
export default class View {
  constructor(viewModel) {
    this.viewModel = viewModel;
    this.gameContainer = document.getElementById("gameContainer");
    this.actionsContainer = document.getElementById("actionsContainer");
    this.setupContainer = document.getElementById("setupContainer");
    this.modal = $("#modal");
    this.navBarGameControlButton = document.getElementById("navBarGameControl");
    this.loading = document.getElementById("loading");
  }

  hideLoading() {
    this.loading.classList.add("d-none");
  }

  updateView(template) {
    if (!this.viewModel.firstTurn) {
      this.setupContainer.classList.add("d-none");
      this.gameContainer.classList.remove("d-none");
      this.navBarGameControlButton.textContent = "New Game";
      this.navBarGameControlButton.dataset.action = "new";
    } else {
      document
        .getElementById("setupSteps")
        .insertAdjacentHTML(
          "beforeend",
          templates.getSetupHtml(this.viewModel.currentDeck)
        );
    }

    this.actionsContainer.innerHTML = template;
  }

  showLoadGameModal() {
    const modal = $("#loadModal");
    modal.modal("show");
  }

  showModal() {
    this.modal.modal("show");
  }
}
