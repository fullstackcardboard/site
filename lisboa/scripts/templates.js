import actions from "./actions.js";

export default class Templates {
  getActionHtml = (action, viewModel) => {
    if (!action) {
      return "";
    }
    let html = `
  <div class="text-center">
    <img src="./content/images/${action.image}" class="img-fluid" style="max-height: 11.8vh;" />
    <h5>${action.title}</h5>
  </div>
  <div style="font-size: 1.8vh;">
    <ul class="list-unstyled mb-1 mt-1">
      <li class="badge-dark col-12 col-lg-6 mx-auto mb-2 rounded">    
        <p><img src="/lisboa/content/images/${viewModel.currentDeck.image}" class="img-fluid mr-2"  style="height: 3vh;"/>
        Helper location: ${viewModel.currentDeck.title}</p>
      </li>
        `;

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
    <div id="controlsContainer" class="col text-center mt-2">
    <div class="btn-group" role="group" aria-label="Basic example">
      <button type="button" class="btn btn-secondary" disabled><i class="fas fa-arrow-left mr-2"></i>Back</button>
      <button type="button" class="btn btn-secondary" data-action="step" data-step-to="state">State Action<i class="fas fa-arrow-right ml-2"></i></button>
    </div>
    </div>
  <div  class="col-12 text-center mt-3 mt-lg-0 slide-in" style="font-size: 1.8vh;">
    <img src="./content/images/${viewModel.currentNoble.image}" class="img-fluid" style="max-height: 60vh;" />
    <p class="badge-dark col-12 col-lg-6 mx-auto rounded">Lacerda's courtier visits ${viewModel.currentNoble.title}</p>
  </div>
  <div>`;

    return html;
  };

  state = viewModel => {
    if (!viewModel.currentStateAction) {
      return "";
    }

    const stateActionTemplate = ` 
    <div id="controlsContainer" class="col text-center mt-2">
    <div class="btn-group" role="group" aria-label="Basic example">
      <button type="button" class="btn btn-secondary" data-action="step"  data-step-to="courtier"><i class="fas fa-arrow-left mr-2"></i>Courtier Visit</button>
      <button type="button" class="btn btn-secondary" data-action="step" data-step-to="noble">Noble Action<i class="fas fa-arrow-right ml-2"></i></button>
    </div>
    </div> 
    <div class="col-12 text-center mt-3 mt-lg-0 slide-in">
    <div class="text-center">
      ${this.getActionHtml(viewModel.currentStateAction, viewModel)}
    </div>
  </div>`;

    return stateActionTemplate;
  };

  noble = viewModel => {
    if (!viewModel.currentNobleAction) {
      return "";
    }

    const nobleActionTemplate = `  

    <div id="controlsContainer" class="col text-center mt-2">
    <div class="btn-group" role="group" aria-label="Basic example">
      <button type="button" class="btn btn-secondary" data-action="step"  data-step-to="state"><i class="fas fa-arrow-left mr-2"></i>State Action</button>
      <button type="button" class="btn btn-secondary" data-action="step" data-step-to="discardDeck">Discard<i class="fas fa-arrow-right ml-2"></i></button>
    </div>
    </div>    
  <div class="col-12 text-center mt-3 mt-lg-0 slide-in">
  <div class="text-center">
    ${this.getActionHtml(viewModel.currentNobleAction, viewModel)}
  </div>
</div>`;

    return nobleActionTemplate;
  };

  discardDeck = viewModel => {
    if (!viewModel.currentDeck) {
      return "";
    }

    const discardDeckTemplate = `
    <div id="controlsContainer" class="col text-center mt-2">
    <div class="btn-group" role="group" aria-label="Basic example">
      <button type="button" class="btn btn-secondary" data-action="step"  data-step-to="noble"><i class="fas fa-arrow-left mr-2"></i>Noble Action</button>
      <button type="button" class="btn btn-secondary" data-action="step" data-step-to="moveDeck">Move Helper<i class="fas fa-arrow-right ml-2"></i></button>
    </div>
    </div>
    <div class="col-12 text-center mt-3 mt-lg-0 slide-in" style="font-size: 1.8vh;">
    <img src="./content/images/${viewModel.currentDeck.image}" class="img-fluid rounded mx-auto d-block mt-3 mb-2" style="max-height: 60vh;" />
    <p class="badge-dark col-12 col-lg-6 mx-auto mt-2 rounded">Lacerda discards from the ${viewModel.currentDeck.title} (if able)</p>
    </div>`;

    return discardDeckTemplate;
  };

  moveDeck = viewModel => {
    if (!viewModel.currentDeck) {
      return "";
    }

    const moveDeckTemplate = `
    <div id="controlsContainer" class="col text-center mt-2">
    <div class="btn-group" role="group" aria-label="Basic example">
      <button type="button" class="btn btn-secondary" data-action="step"  data-step-to="previousDiscardDeck"><i class="fas fa-arrow-left mr-2"></i>Discard</button>
      <button type="button" class="btn btn-secondary" data-action="skipDeck">Skip Deck</button>
      <button type="button" class="btn btn-secondary" data-action="step" data-step-to="follow">Follow<i class="fas fa-arrow-right ml-2"></i></button>
    </div>
    </div>
    <div class="col-12 text-center mt-3 mt-lg-0 slide-in" style="font-size: 1.8vh;">
    <img src="./content/images/${viewModel.currentDeck.image}" class="img-fluid rounded mx-auto d-block mt-3 mb-2" style="max-height: 60vh;" />
    <p class="badge-dark col-12 col-lg-6 mx-auto mt-2 rounded">Lacerda's helper moves to the ${viewModel.currentDeck.title} (if able, otherwise skip deck)</p>
    </div>`;

    return moveDeckTemplate;
  };

  previousDiscardDeck = viewModel => {
    if (!viewModel.currentDeck) {
      return "";
    }

    const discardDeckTemplate = `
    <div id="controlsContainer" class="col text-center mt-2">
    <div class="btn-group" role="group" aria-label="Basic example">
      <button type="button" class="btn btn-secondary" data-action="step"  data-step-to="noble"><i class="fas fa-arrow-left mr-2"></i>Noble Action</button>
      <button type="button" class="btn btn-secondary" data-action="step" data-step-to="moveDeck">Move Helper<i class="fas fa-arrow-right ml-2"></i></button>
    </div>
    </div>
    <div class="col-12 text-center mt-3 mt-lg-0 slide-in" style="font-size: 1.8vh;">
    <img src="./content/images/${viewModel.previousDeck.image}" class="img-fluid rounded mx-auto d-block mt-3 mb-2" style="max-height: 60vh;" />
    <p class="badge-dark col-12 col-lg-6 mx-auto mt-2 rounded">Lacerda discards from the ${viewModel.previousDeck.title} (if able)</p>
    </div>`;

    return discardDeckTemplate;
  };

  follow = viewModel => {
    if (!viewModel.currentNoble) {
      return "";
    }
    const followTemplate = `
    <div id="controlsContainer" class="col text-center mt-2">
    <div class="btn-group" role="group" aria-label="Basic example">
      <button type="button" class="btn btn-secondary" data-action="step"  data-step-to="moveDeck"><i class="fas fa-arrow-left mr-2"></i>Move Helper</button>
      <button type="button" class="btn btn-secondary" data-action="step" data-step-to="playerTurn">Player Turn<i class="fas fa-arrow-right ml-2"></i></button>
    </div>
    </div>
    <div class="col-12 text-center mt-3 mt-lg-0 slide-in" style="font-size: 1.8vh;">
    <img src="./content/images/${viewModel.currentNoble.royalFavor}" class="img-fluid rounded mx-auto d-block mt-3 mb-2" style="max-height: 60vh;" />
    <p class="badge-dark col-12 col-lg-6 mx-auto mt-2 rounded">Player is able to follow with a royal favor from ${viewModel.currentNoble.title}</p>
    </div>`;

    return followTemplate;
  };

  lacerdaFollow = (viewModel) => {
    const followTemplate = `
    <div id="controlsContainer" class="col text-center mt-2">
    <div class="btn-group" role="group" aria-label="Basic example">
      <button type="button" class="btn btn-secondary" data-action="step" data-step-to="playerTurn"><i class="fas fa-arrow-left mr-2"></i>Player Turn</button>
      <button type="button" class="btn btn-secondary" data-action="nextAction" >Next Turn<i class="fas fa-arrow-right ml-2"></i></button>
    </div>
    </div>
    <div class="col-12 text-center mt-3 mt-lg-0 slide-in" style="font-size: 1.8vh;">
    <div class="row">
      <div class="col">
        <img src="./content/images/builder_favor.png" class="img-fluid rounded mx-auto d-block mt-3 mb-2" style="max-height: 60vh;" />
      </div>
      <div class="col">
        <img src="./content/images/marquis_favor.png" class="img-fluid rounded mx-auto d-block mt-3 mb-2" style="max-height: 60vh;" />
      </div>
      <div class="col">
        <img src="./content/images/king_favor.png" class="img-fluid rounded mx-auto d-block mt-3 mb-2" style="max-height: 60vh;" />
      </div>
    </div>    
    <p class="badge-dark col-12 col-lg-6 mx-auto mt-2 rounded">Lacerda is able to follow if player visited a noble, and he has the proper royal favor</p>
    </div>
    ${this.getActionHtml(actions.nobleActions.filter(x => x.id === "builder")[0], viewModel)}
    ${this.getActionHtml(actions.nobleActions.filter(x => x.id === "minister")[0], viewModel)}
    ${this.getActionHtml(actions.nobleActions.filter(x => x.id === "king")[0], viewModel)}`;

    return followTemplate;
  };

  playerTurn() {
    const playerTurnTemplate = `
    <div id="controlsContainer" class="col text-center mt-2">
    <div class="btn-group" role="group" aria-label="Basic example">
      <button type="button" class="btn btn-secondary" data-action="step" data-step-to="follow"><i class="fas fa-arrow-left mr-2"></i>Follow</button>
      <button type="button" class="btn btn-secondary" data-action="step" data-step-to="lacerdaFollow">Lacerda Follow<i class="fas fa-arrow-right ml-2"></i></button>
    </div>
    </div>
    <div class="col-12 text-center mt-3 mt-lg-0 slide-in" style="font-size: 1.8vh;">
    <img src="./content/images/WIGS.png" class="img-fluid rounded mx-auto d-block mt-3 mb-2" style="max-height: 60vh;" />
    <p class="badge-dark col-12 col-lg-6 mx-auto mt-2 rounded">Player Turn</p>
    </div>`;

    return playerTurnTemplate;
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
