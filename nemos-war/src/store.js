import motives from "./data/motiveData.js";
import scoringActivities from "./data/scoringActivityData.js";

export default {
  state: {
    motive: null,
    scoringActivities,
    motives,
    get totalPoints() {
      const total = this.scoringActivities.reduce(function(
        accumulator,
        currentValue
      ) {
        return accumulator + currentValue.points;
      },
      0);

      return total < 0 ? 0 : total;
    }
  }
};
