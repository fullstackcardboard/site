export default class CardTemplateFactory {
  createCurrentCardTemplate(currentCard) {
    const html = `<div><img src="${currentCard.frontImage}"/></div>`;

    return html;
  }
  createNextCardTemplate(nextCard) {
    const html = `<div><img src="${nextCard.rearImage}"/></div>`;

    return html;
  }
}
