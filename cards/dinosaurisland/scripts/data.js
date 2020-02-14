import Card from "../../scripts/models/card.js";
const baseImageUrl = "/cards/dinosaurisland/content/images/";
const backImage = baseImageUrl + "back.png"
const cards = [
  new Card(1, baseImageUrl + "easy_1.png", backImage, "", "easy"),
  new Card(2, baseImageUrl + "easy_2.png", backImage, "", "easy"),
  new Card(3, baseImageUrl + "easy_3.png", backImage, "", "easy"),
  new Card(4, baseImageUrl + "easy_4.png", backImage, "", "easy"),
  new Card(5, baseImageUrl + "difficult_1.png", backImage, "", "difficult"),
  new Card(6, baseImageUrl + "difficult_2.png", backImage, "", "difficult"),
  new Card(7, baseImageUrl + "difficult_3.png", backImage, "", "difficult"),
  new Card(8, baseImageUrl + "difficult_4.png", backImage, "", "difficult"),
  new Card(9, baseImageUrl + "difficult_5.png", backImage, "", "difficult"),
  new Card(10, baseImageUrl + "difficult_6.png", backImage, "", "difficult"),
  new Card(11, baseImageUrl + "difficult_7.png", backImage, "", "difficult"),
  new Card(12, baseImageUrl + "difficult_8.png", backImage, "", "difficult")
];

export default { cards };
