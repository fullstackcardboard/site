class Noble {
  constructor(
    id,
    title,
    topStateActionId,
    bottomStateActionId,
    moveNext,
    image,
    royalFavor
  ) {
    this.title = title;
    this.bottomStateActionId = bottomStateActionId;
    this.topStateActionId = topStateActionId;
    this.id = id;
    this.moveNext = moveNext;
    this.image = image;
    this.royalFavor = royalFavor;
    this.nobleAction = {};
    this.topStateAction = {};
    this.bottomStateAction = {};
  }
}

const builder = new Noble(
  "builder",
  "The Builder",
  "recruit",
  "plan",
  "minister",
  "builder.png",
  "builder_favor.png"
);
const minister = new Noble(
  "minister",
  "The Marquis",
  "ship",
  "produce",
  "king",
  "marquis.png",
  "marquis_favor.png"
);
const king = new Noble(
  "king",
  "The King",
  "cardinal",
  "favor",
  "builder",
  "king.png",
  "king_favor.png"
);

const nobles = [builder, minister, king];

export default nobles;
