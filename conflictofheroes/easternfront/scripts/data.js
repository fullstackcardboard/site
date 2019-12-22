import Card from "./models/card.js";

const baseImageUrl = "/conflictofheroes/easternfront/content/images/cards/";

function buildMissionCardData(firstCard, lastCard) {
  const cards = [];
  for (
    let index = firstCard - 1;
    index < lastCard - 1;
    index++
  ) {
    const backImage = baseImageUrl + "back.png";
    const frontImage = baseImageUrl + index + ".png";
    cards.push(new Card(index, frontImage, backImage));
  }

  return cards;
}

export default buildMissionCardData;