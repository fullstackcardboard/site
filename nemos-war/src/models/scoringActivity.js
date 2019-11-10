export default class ScoringActivity {
  constructor(type, possibleValues, allowNegative = false) {
    this.type = type;
    this.possibleValues = possibleValues;
    this.allowNegative = allowNegative;
    this.imageUrl = `${this.type}.png`;
    this.points = 0;
  }
}
