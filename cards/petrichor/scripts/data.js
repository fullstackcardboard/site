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

class Tile {
  constructor(id, includeInSolo, soloPriority) {
    this.id = id;
    this.includeInSolo = includeInSolo;
    this.image = `./images/${id}.png`;
    this.soloPriority = soloPriority;
  }
}

const baseTiles = [
  new Tile("coffea", true, 7),
  new Tile("coffea2", true, 9),
  new Tile("gossypium", true, 8),
  new Tile("gossypium2", true, 10),
  new Tile("gossypium3", false, 0),
  new Tile("grass", true, 1),
  new Tile("grass2", true, 2),
  new Tile("grass3", false, 0),
  new Tile("potato", true, 5),
  new Tile("potato2", false, 0),
  new Tile("sativa", false, 0),
  new Tile("wheat", true, 3),
  new Tile("wheat2", true, 6),
  new Tile("wheat3", true, 0),
  new Tile("zea-mays", false, 7),
  new Tile("zea-mays", false, 7),
];

export default {
  baseCards,
  honeyBeeCards,
  baseTiles
};
