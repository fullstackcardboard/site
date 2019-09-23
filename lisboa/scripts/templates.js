export default class Templates {
  getActionHtml(action) {
    if (!action) {
      return "";
    }
    let html = `
  <div class="text-center">
    <img src="./content/images/${action.image}" class="img-fluid" style="max-height: 12vh;" />
    <h5>${action.title}</h5>
  </div>
  <div>
    <ul class="list-unstyled mb-1 mt-1">`;

    for (let index = 0; index < action.steps.length; index++) {
      const step = action.steps[index];
      html += `<li class="badge-dark col-12 mb-2 rounded"><p>${step}</p></li>`;
    }
    html += `
    </div>`;

    return html;
  }

  getActionDisplay(nobleAction, stateAction) {
    if (!nobleAction || !stateAction) {
      return "";
    }
    const html = `
    <div class="row">
      <div class="col-12 col-md-6 text-center">
        <img src="./content/images/${stateAction.image}" class="img-fluid rounded m-auto d-block d-md-none" style="max-height: 20vh;"/>
        <button class="btn btn-dark btn-block d-block d-md-none" data-action="displayAction" data-action-id="${stateAction.id}">${stateAction.title}</button>
        <div class="text-center d-none d-md-block">
          ${this.getActionHtml(stateAction)}
        </div>
      </div>
      <div class="col-12 col-md-6 text-center">
        <img src="./content/images/${nobleAction.image}" class="img-fluid rounded m-auto d-block d-md-none" style="max-height: 20vh;"/>
        <button class="btn btn-dark btn-block d-block d-lg-none" data-action="displayAction" data-action-id="${nobleAction.id}">${nobleAction.title}</button>
        <div class="text-center d-none d-md-block">
          ${this.getActionHtml(nobleAction)}
        </div>
      </div>
    </div>`;

    return html;
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

    html += "<li>Discard the cubes on the space.</li>"

    return html;
  }
}
