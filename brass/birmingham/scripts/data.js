import Card from "../../scripts/models/card.js";

const cards = [];

for (let index = 1; index < 22; index++) {
  const frontImage = `/brass/birmingham/content/images/cards/FRONT_R${index}.jpg`;
  const rearImage = `/brass/birmingham/content/images/cards/BACK_R${index}.jpg`;
  cards.push(new Card(index, frontImage, rearImage, ""));
}

export default { cards };
