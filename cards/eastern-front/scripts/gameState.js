import SaveManager from "../../../scripts/shared/saveManager.js";

const saveManager = new SaveManager();
const key = "easternfront";

export default class GameState {
  constructor(missionId) {
    this.key = `${key}:${missionId}`;
  }
  set(viewModel) {
    saveManager.save(this.key, viewModel);
  }

  clear() {
    saveManager.clear(this.key);
  }

  getSavedState() {
    return saveManager.load(this.key);
  }

  showLoadGameModal() {
    const modal = $("#loadModal");
    modal.modal("show");
  }
}
