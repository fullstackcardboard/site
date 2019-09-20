class Noble {
  constructor(id, title, topStateAction, bottomStateAction, moveNext) {
    this.title = title;
    this.bottomStateAction = bottomStateAction;
    this.topStateAction = topStateAction;
    this.id = id;
    this.moveNext = moveNext;
  }
}

const builder = new Noble(
  "builder",
  "The Builder",
  "recruit",
  "plan",
  "minister"
);
const minister = new Noble(
  "minister",
  "The Minister",
  "ship",
  "produce",
  "king"
);
const king = new Noble("king", "The King", "cardinal", "favor", "builder");

const nobles = [builder, minister, king];

export default nobles;
