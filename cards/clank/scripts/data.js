import Card from "../../scripts/models/card.js";
const baseImageUrl = "/cards/clank/images/";
const cards = [
  new Card(1, baseImageUrl + "card1.png", baseImageUrl + "back1.png", "", "a"),
  new Card(2, baseImageUrl + "card2.png", baseImageUrl + "back1.png", "", "a"),
  new Card(3, baseImageUrl + "card3.png", baseImageUrl + "back1.png", "", "a"),
  new Card(4, baseImageUrl + "card4.png", baseImageUrl + "back1.png", "", "a"),
  new Card(5, baseImageUrl + "card5.png", baseImageUrl + "back1.png", "", "a"),
  new Card(6, baseImageUrl + "card6.png", baseImageUrl + "back1.png", "", "b"),
  new Card(7, baseImageUrl + "card7.png", baseImageUrl + "back1.png", "", "b"),
  new Card(8, baseImageUrl + "card8.png", baseImageUrl + "back1.png", "", "b")
];

export default { cards };
