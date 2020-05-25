import Card from "../../scripts/models/card.js";
const baseImageUrl = "./images/";
const baseCards = [];

for (let index = 0; index < 9; index++) {
  baseCards.push(
    new Card(
      index,
      `${baseImageUrl}${index + 1}.png`,
      `${baseImageUrl}back.png`,
      index == 8 ? "reshuffle" : "",
      "base"
    )
  );
}

const honeyBeeCards = [];

for (let index = 9; index < 11; index++) {
  honeyBeeCards.push(
    new Card(
      index,
      `${baseImageUrl}${index + 1}.png`,
      `${baseImageUrl}back.png`,
      "",
      "honeybee"
    )
  );
}

const baseTiles = [];

export default {
  baseCards,
  honeyBeeCards,
};
