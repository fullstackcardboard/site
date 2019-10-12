import Templates from "./templates.js";

export default class StepManager {
  constructor() {
    this.templates = new Templates();
  }

  handle(step, viewModel) {
    const getTemplateFunction = this.templates[step];

    return getTemplateFunction(viewModel);
  }
}
