export default class Templates {
  getActionHtml = action => {
    if (!action) {
      return "";
    }
    let html = `
  <div class="text-center">
    <img src="./content/images/${action.image}" class="img-fluid" style="max-height: 11.8vh;" />
    <h5>${action.title}</h5>
  </div>
  <div style="font-size: 1.8vh;">
    <ul class="list-unstyled mb-1 mt-1">`;

    for (let index = 0; index < action.steps.length; index++) {
      const step = action.steps[index];
      html += `<li class="badge-dark col-12 col-lg-6 mx-auto mb-2 rounded"><p>${step}</p></li>`;
    }
    html += `
    </div>`;

    return html;
  };

  courtier = viewModel => {
    if (!viewModel.currentNoble) {
      return "";
    }

    let html = `
  <div  class="col-12 text-center mt-3 mt-lg-0 slide-in" style="font-size: 1.8vh;">
    <img src="./content/images/${viewModel.currentNoble.image}" class="img-fluid" style="max-height: 60vh;" />
    <p class="badge-dark col-12 col-lg-6 mx-auto rounded">Lacerda's courtier visits ${viewModel.currentNoble.title}</p>
  </div>
  <div>
  <div id="controlsContainer" class="col text-center mt-2">
  <div class="btn-group" role="group" aria-label="Basic example">
    <button type="button" class="btn btn-secondary" disabled>Back</button>
    <button type="button" class="btn btn-secondary" data-action="step" data-step-to="state">Next</button>
  </div>
  </div>`;

    return html;
  };

  state = viewModel => {
    if (!viewModel.currentStateAction) {
      return "";
    }

    const stateActionTemplate = `  
    <div class="col-12 text-center mt-3 mt-lg-0 slide-in">
    <div class="text-center">
      ${this.getActionHtml(viewModel.currentStateAction)}
    </div>
  </div>
  <div id="controlsContainer" class="col text-center mt-2">
  <div class="btn-group" role="group" aria-label="Basic example">
    <button type="button" class="btn btn-secondary" data-action="step"  data-step-to="courtier">Back</button>
    <button type="button" class="btn btn-secondary" data-action="step" data-step-to="noble">Next</button>
  </div>
  </div>`;

    return stateActionTemplate;
  };

  noble = viewModel => {
    if (!viewModel.currentNobleAction) {
      return "";
    }

    const nobleActionTemplate = `      
  <div class="col-12 text-center mt-3 mt-lg-0 slide-in">
  <div class="text-center">
    ${this.getActionHtml(viewModel.currentNobleAction)}
  </div>
</div>

<div id="controlsContainer" class="col text-center mt-2">
<div class="btn-group" role="group" aria-label="Basic example">
  <button type="button" class="btn btn-secondary" data-action="step"  data-step-to="state">Back</button>
  <button type="button" class="btn btn-secondary" data-action="step" data-step-to="discardDeck">Next</button>
</div>
</div>`;

    return nobleActionTemplate;
  };

  discardDeck = viewModel => {
    if (!viewModel.currentDeck) {
      return "";
    }

    const discardDeckTemplate = `
    <div class="col-12 text-center mt-3 mt-lg-0 slide-in" style="font-size: 1.8vh;">
    <img src="./content/images/${viewModel.currentDeck.image}" class="img-fluid rounded mx-auto d-block mt-3 mb-2" style="max-height: 60vh;" />
    <p class="badge-dark col-12 col-lg-6 mx-auto mt-2 rounded">Lacerda discards from the ${viewModel.currentDeck.title} (if able)</p>
    </div>
    <div id="controlsContainer" class="col text-center mt-2">
    <div class="btn-group" role="group" aria-label="Basic example">
      <button type="button" class="btn btn-secondary" data-action="step"  data-step-to="noble">Back</button>
      <button type="button" class="btn btn-secondary" data-action="step" data-step-to="moveDeck">Next</button>
    </div>
    </div>`;

    return discardDeckTemplate;
  };

  moveDeck = viewModel => {
    if (!viewModel.currentDeck) {
      return "";
    }

    const moveDeckTemplate = `
    <div class="col-12 text-center mt-3 mt-lg-0 slide-in" style="font-size: 1.8vh;">
    <img src="./content/images/${viewModel.currentDeck.image}" class="img-fluid rounded mx-auto d-block mt-3 mb-2" style="max-height: 60vh;" />
    <p class="badge-dark col-12 col-lg-6 mx-auto mt-2 rounded">Lacerda's helper moves to the ${viewModel.currentDeck.title} (if able, otherwise skip deck)</p>
    </div>
    <div id="controlsContainer" class="col text-center mt-2">
    <div class="btn-group" role="group" aria-label="Basic example">
      <button type="button" class="btn btn-secondary" data-action="step"  data-step-to="previousDiscardDeck">Back</button>
      <button type="button" class="btn btn-secondary" data-action="skipDeck">Skip Deck</button>
      <button type="button" class="btn btn-secondary" data-action="nextAction">Next</button>
    </div>
    </div>`;

    return moveDeckTemplate;
  };

  previousDiscardDeck = viewModel => {
    if (!viewModel.currentDeck) {
      return "";
    }

    const discardDeckTemplate = `
    <div class="col-12 text-center mt-3 mt-lg-0 slide-in" style="font-size: 1.8vh;">
    <img src="./content/images/${viewModel.previousDeck.image}" class="img-fluid rounded mx-auto d-block mt-3 mb-2" style="max-height: 60vh;" />
    <p class="badge-dark col-12 col-lg-6 mx-auto mt-2 rounded">Lacerda discards from the ${viewModel.previousDeck.title} (if able)</p>
    </div>
    <div id="controlsContainer" class="col text-center mt-2">
    <div class="btn-group" role="group" aria-label="Basic example">
      <button type="button" class="btn btn-secondary" data-action="step"  data-step-to="noble">Back</button>
      <button type="button" class="btn btn-secondary" data-action="step" data-step-to="moveDeck">Next</button>
    </div>
    </div>`;

    return discardDeckTemplate;

  }

  getSetupHtml(currentDeck) {
    let html = "";
    if (currentDeck.id === "builder" || currentDeck.id === "minister") {
      html +=
        "<li>Place the top blue architect Public Building tile to the west of row D.</li>";
    } else {
      html +=
        "<li>Place the top green architect Public Building tile to the east of row D.</li>";
    }

    html += "<li>Discard the cubes on the space.</li>";

    return html;
  }
}
