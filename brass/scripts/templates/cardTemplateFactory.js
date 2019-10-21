export default class CardTemplateFactory {
  createCurrentCardTemplate(currentCard) {
    const html = `<div class="text-center slide-in-right" id="nextCardImageContainer"><img class="img-fluid image-height round-corners" src="${currentCard.frontImage}"/></div>`;

    return html;
  }
  createNextCardTemplate(nextCard) {
    const html = `<div class="text-center slide-in-right" id="currentCardImageContainer"><img class="img-fluid image-height round-corners" src="${nextCard.rearImage}"/></div>`;

    return html;
  }
}
