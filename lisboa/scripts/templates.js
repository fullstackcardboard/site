export default class Templates {
  getActionHtml(action) {
    if (!action) {
      return '';
    }
    let html = `
  <div>
    <h2 class="text-black mt-1">${action.type} Action</h2>
  </div>
  <div>
    <h4>${action.title}</h4>
  </div>
  <div>
    <ul class="list-unstyled mb-1 mt-1">`;

    for (let index = 0; index < action.steps.length; index++) {
      const step = action.steps[index];
      html += `<li class="badge-dark col-12 mb-2 rounded"><p>${step}</p></li>`;
    }
    html += `
    </div>
  </div>`;

    return html;
  }

  getNoblePositionHtml(currentNoble, nextNoble) {
    if (!currentNoble || !nextNoble) {
      return '';
    }
    const html = `
      <div class="row">
      <div class="col">Current Noble: ${currentNoble.title}</div>
      <div class="col">Next Noble: ${nextNoble.title}</div>
      </div>
      `;

    return html;
  }

  getTreasuryDeckHtml(currentDeck, nextDeck) {
    if (!currentDeck || !nextDeck) {
      return '';
    }
    const html = `
      <div class="row">
      <div class="col">Current Deck: ${currentDeck.title}</div>
      <div class="col">Next Deck: ${nextDeck.title}</div>
      </div>
      `;

    return html;
  }
}
