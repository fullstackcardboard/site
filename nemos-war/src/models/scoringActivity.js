export default class ScoringActivity {
  constructor(type, possibleValues) {
    this.type = type;
    this.possibleValues = possibleValues;
    this.imageUrl = `${this.type}.png`
    this.points = 0;
  }
}
