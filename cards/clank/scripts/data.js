import Card from "../../scripts/models/card.js";
const baseImageUrl = "/cards/clank/images/";
const cards = [
  new Card(1, baseImageUrl + "Card1.png", baseImageUrl + "Back1.png", "", "a"),
  new Card(2, baseImageUrl + "Card2.png", baseImageUrl + "Back1.png", "", "a"),
  new Card(3, baseImageUrl + "Card3.png", baseImageUrl + "Back1.png", "", "a"),
  new Card(4, baseImageUrl + "Card4.png", baseImageUrl + "Back1.png", "", "a"),
  new Card(5, baseImageUrl + "Card5.png", baseImageUrl + "Back1.png", "", "a"),
  new Card(6, baseImageUrl + "Card6.png", baseImageUrl + "Back1.png", "", "b"),
  new Card(7, baseImageUrl + "Card7.png", baseImageUrl + "Back1.png", "", "b"),
  new Card(8, baseImageUrl + "Card8.png", baseImageUrl + "Back1.png", "", "b")
];

export default { cards };
