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
  "builder_seal.png"
);
const minister = new Noble(
  "minister",
  "The Minister",
  "ship",
  "produce",
  "king",
  "marquis_seal.png"
);
const king = new Noble(
  "king",
  "The King",
  "cardinal",
  "favor",
  "builder",
  "king_seal.png"
);

const nobles = [builder, minister, king];

export default nobles;
