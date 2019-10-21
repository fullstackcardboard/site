import utilites from "../../../scripts/shared/utilities.js";

export default class CardTemplateFactory {
  constructor() {
    this.currentEnvironment = utilites.findBootstrapEnvironment();
  }
  createCurrentCardTemplate(currentCard) {
    if (!currentCard) {
      return `<div id="currentCardImageContainer"></div>`;
    }
    const html = `<div class="text-center slide-in-right" id="currentCardImageContainer"><img class="img-fluid round-corners" style="height: ${this.imageHeight}vh !important;" src="${currentCard.frontImage}"/></div>`;

    return html;
  }
  createNextCardTemplate(nextCard) {
    if (!nextCard) {
      return `<div id="nextCardImageContainer"></div>`;
    }

    const html = `<div class="text-center slide-in-right" id="nextCardImageContainer"><img class="img-fluid round-corners" style="height: ${this.imageHeight}vh !important;" src="${nextCard.rearImage}"/></div>`;

    return html;
  }

  get imageHeight() {
    if (this.currentEnvironment === "lg" || this.currentEnvironment === "xl") {
      return 50;
    } else {
      return 30;
    }
  }
}
