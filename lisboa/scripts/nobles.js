class Noble {
  constructor(
    id,
    title,
    topStateActionId,
    bottomStateActionId,
    moveNext,
    image
  ) {
    this.title = title;
    this.bottomStateActionId = bottomStateActionId;
    this.topStateActionId = topStateActionId;
    this.id = id;
    this.moveNext = moveNext;
    this.image = image;
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
  "builder.png"
);
const minister = new Noble(
  "minister",
  "The Marquis",
  "ship",
  "produce",
  "king",
  "marquis.png"
);
const king = new Noble(
  "king",
  "The King",
  "cardinal",
  "favor",
  "builder",
  "king.png"
);

const nobles = [builder, minister, king];

export default nobles;
