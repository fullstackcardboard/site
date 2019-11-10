import Motive from "../models/motive.js";
import ScoringModifier from "../models/scoringModifier.js";
import modificationType from "../models/modificationType.js";

const exploreMotive = new Motive("Explore", [
  new ScoringModifier("warship", modificationType.subtract, 1),
  new ScoringModifier("ship", modificationType.add, 0),
  new ScoringModifier("adventure", modificationType.add, 0),
  new ScoringModifier("treasure", modificationType.add, 1),
  new ScoringModifier("liberation", modificationType.multiply, 3),
  new ScoringModifier("science", modificationType.multiply, 4),
  new ScoringModifier("wonders", modificationType.multiply, 7),
  new ScoringModifier("characters", modificationType.add, 0),
  new ScoringModifier("penalty", modificationType.add, 0),
  new ScoringModifier("scouring", modificationType.add, 0)
]);

const antiImperialism = new Motive("Anti-Imperialism", [
  new ScoringModifier("warship", modificationType.add, 0),
  new ScoringModifier("ship", modificationType.add, 2),
  new ScoringModifier("adventure", modificationType.add, 0),
  new ScoringModifier("treasure", modificationType.subtract, 1),
  new ScoringModifier("liberation", modificationType.multiply, 6),
  new ScoringModifier("science", modificationType.multiply, 2),
  new ScoringModifier("wonders", modificationType.multiply, 3),
  new ScoringModifier("characters", modificationType.add, 0),
  new ScoringModifier("penalty", modificationType.add, 0),
  new ScoringModifier("scouring", modificationType.add, 0)
]);

const science = new Motive("Science", [
  new ScoringModifier("warship", modificationType.add, 0),
  new ScoringModifier("ship", modificationType.subtract, 1),
  new ScoringModifier("adventure", modificationType.add, 1),
  new ScoringModifier("treasure", modificationType.add, 0),
  new ScoringModifier("liberation", modificationType.multiply, 3),
  new ScoringModifier("science", modificationType.multiply, 6),
  new ScoringModifier("wonders", modificationType.multiply, 4),
  new ScoringModifier("characters", modificationType.add, 0),
  new ScoringModifier("penalty", modificationType.add, 0),
  new ScoringModifier("scouring", modificationType.add, 0)
]);

const war = new Motive("War!", [
  new ScoringModifier("warship", modificationType.add, 2),
  new ScoringModifier("ship", modificationType.subtract, 0),
  new ScoringModifier("adventure", modificationType.subtract, 1),
  new ScoringModifier("treasure", modificationType.add, 0),
  new ScoringModifier("liberation", modificationType.multiply, 4),
  new ScoringModifier("science", modificationType.multiply, 3),
  new ScoringModifier("wonders", modificationType.multiply, 2),
  new ScoringModifier("characters", modificationType.add, 0),
  new ScoringModifier("penalty", modificationType.add, 0),
  new ScoringModifier("scouring", modificationType.add, 0)
]);

const adventure = new Motive("Adventure", [
  new ScoringModifier("warship", modificationType.add, 0),
  new ScoringModifier("ship", modificationType.subtract, 1),
  new ScoringModifier("adventure", modificationType.add, 2),
  new ScoringModifier("treasure", modificationType.add, 0),
  new ScoringModifier("liberation", modificationType.multiply, 3),
  new ScoringModifier("science", modificationType.multiply, 3),
  new ScoringModifier("wonders", modificationType.multiply, 3),
  new ScoringModifier("characters", modificationType.add, 0),
  new ScoringModifier("penalty", modificationType.add, 0),
  new ScoringModifier("scouring", modificationType.add, 0)
]);

const humanist = new Motive("Humanist", [
  new ScoringModifier("warship", modificationType.subtract, 1),
  new ScoringModifier("ship", modificationType.subtract, 1),
  new ScoringModifier("adventure", modificationType.add, 0),
  new ScoringModifier("treasure", modificationType.add, 0),
  new ScoringModifier("liberation", modificationType.multiply, 8),
  new ScoringModifier("science", modificationType.multiply, 5),
  new ScoringModifier("wonders", modificationType.multiply, 3),
  new ScoringModifier("characters", modificationType.add, 0),
  new ScoringModifier("penalty", modificationType.add, 0),
  new ScoringModifier("scouring", modificationType.add, 0)
]);

const motives = [
  exploreMotive,
  antiImperialism,
  science,
  war,
  adventure,
  humanist
];

export default motives;
