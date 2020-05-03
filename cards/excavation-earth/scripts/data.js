import Card from "../../scripts/models/card.js";
const baseImageUrl = "/cards/excavation-earth/content/images/";
const backImage = baseImageUrl + "back.png";
const cards = [];

for (let index = 0; index < 6; index++) {
  cards.push(
    new Card(
      `${index}command`,
      `${baseImageUrl}command_${index + 1}.png`,
      backImage,
      "",
      "command"
    )
  );
}
for (let index = 0; index < 8; index++) {
  cards.push(
    new Card(
      `${index}excavate`,
      `${baseImageUrl}excavate_${index + 1}.png`,
      backImage,
      "",
      "excavate"
    )
  );
}

for (let index = 0; index < 2; index++) {
  cards.push(
    new Card(
      `${index}market`,
      `${baseImageUrl}market_${index + 1}.png`,
      backImage,
      "",
      "market"
    )
  );
}

for (let index = 0; index < 4; index++) {
  cards.push(
    new Card(
      `${index}sell`,
      `${baseImageUrl}sell_${index + 1}.png`,
      backImage,
      "",
      "sell"
    )
  );
}

for (let index = 0; index < 2; index++) {
  cards.push(
    new Card(
      `${index}snipe`,
      `${baseImageUrl}snipe_${index + 1}.png`,
      backImage,
      "",
      "snipe"
    )
  );
}

for (let index = 0; index < 2; index++) {
  cards.push(
    new Card(
      `${index}survey`,
      `${baseImageUrl}survey_${index + 1}.png`,
      backImage,
      "",
      "survey"
    )
  );
}

export default { cards };
