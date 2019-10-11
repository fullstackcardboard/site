export default class ImageHandler {
  preload() {
    const baseUrl = "./content/images/";
    const images = [
      "background.png",
      "BLUEPRINT.png",
      "BUILD.png",
      "CLERGY.png",
      "DECREE.png",
      "FAVOUR.png",
      "OFFICIALS.png",
      "OPEN.png",
      "PRODUCE.png",
      "SHIP.png",
      "king_deck.png",
      "marquis_deck.png",
      "builder_deck.png",
      "treasury_deck.png",
      "builder.png",
      "marquis.png",
      "king.png"
    ];

    for (let index = 0; index < images.length; index++) {
      const imageUrl = images[index];
      const image = new Image();
      image.src = baseUrl + imageUrl;
    }
  }
}
