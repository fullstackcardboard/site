import motives from "./data/motiveData.js";
import scoringActivities from "./data/scoringActivityData.js";

export default {
  state: {
    motive: null,
    scoringActivities,
    motives,
    get totalPoints() {
      return this.scoringActivities.reduce(function(accumulator, currentValue) {
        return accumulator + currentValue.points;
      }, 0);
    }
  }
};
