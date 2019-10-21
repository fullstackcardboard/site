export default class ImageHandler {
  preloadCardImages(cards) {
    for (let index = 0; index < cards.length; index++) {
      const card = cards[index];
      new Image().src = card.frontImage;
      new Image().src = card.rearImage;
    }
  }
}
