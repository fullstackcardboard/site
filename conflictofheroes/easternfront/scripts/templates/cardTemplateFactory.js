import utilites from "../../../../scripts/shared/utilities.js"

export default class CardTemplateFactory {
  constructor() {
    this.currentEnvironment = utilites.findBootstrapEnvironment();
  }
  createCurrentCardTemplate(currentCard) {
    if (!currentCard) {
      return `<div id="currentCardImageContainer"></div>`;
    }
    const html = `<div class="text-center ${this.slideClass}" id="currentCardImageContainer"><img class="img-fluid round-corners" style="height: ${this.imageHeight}vh !important;" src="${currentCard.frontImage}"/></div>`;

    return html;
  }
  createNextCardTemplate(nextCard) {
    if (!nextCard) {
      return `<div id="nextCardImageContainer"></div>`;
    }

    const html = `<div class="text-center" id="nextCardImageContainer"><img class="img-fluid round-corners" style="height: ${this.imageHeight}vh !important;" src="${nextCard.rearImage}"/></div>`;

    return html;
  }

  get slideClass() {
    if (this.currentEnvironment === "md" || this.currentEnvironment === "lg" || this.currentEnvironment === "xl") {
      return "slide";
    }

    return "slide-mobile";
  }

  get imageHeight() {
    if (this.currentEnvironment === "lg" || this.currentEnvironment === "xl") {
      return 50;
    }

    return 30;
  }
}
