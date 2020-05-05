import SaveManager from "../../../scripts/shared/saveManager.js";

const saveManager = new SaveManager();
const key = "excavationearth";

export default class GameState {
  set(viewModel) {
    saveManager.save(key, viewModel);
  }

  clear() {
    saveManager.clear(key);
  }

  getSavedState() {
    return saveManager.load(key);
  }

  showLoadGameModal() {
    const modal = $("#loadModal");
    modal.modal("show");
  }
}
