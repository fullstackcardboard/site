export default class Card {
  constructor(id, frontImage, rearImage, instructions, group) {
    this.id = id;
    this.frontImage = frontImage;
    this.rearImage = rearImage;
    this.instructions = instructions;
    this.group = group;
  }
}
