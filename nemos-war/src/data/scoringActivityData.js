import ScoringActivity from "../models/scoringActivity.js";

const scoringActivities = [
  new ScoringActivity("warship", [0, 1, 2, 3, 4, 5, 7]),
  new ScoringActivity("ship", [0, 1, 2, 3, 4]),
  new ScoringActivity("adventure", [0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 15]),
  new ScoringActivity("treasure", [0, 1, 2, 3, 4, 5]),
  new ScoringActivity("liberation", [1]),
  new ScoringActivity("science", [1]),
  new ScoringActivity("wonders", [1])
];

export default scoringActivities;
