import Motive from "../models/motive.js";
import ScoringModifier from "../models/scoringModifier.js";
import modificationType from "../models/modificationType.js";

const exploreMotive = new Motive("explore", [
  new ScoringModifier("warship", modificationType.subtract, 1),
  new ScoringModifier("ship", modificationType.add, 0),
  new ScoringModifier("adventure", modificationType.add, 0),
  new ScoringModifier("treasure", modificationType.add, 1),
  new ScoringModifier("liberation", modificationType.multiply, 3),
  new ScoringModifier("science", modificationType.multiply, 4),
  new ScoringModifier("wonders", modificationType.multiply, 7)
]);
const motives = [exploreMotive];

export default motives;
