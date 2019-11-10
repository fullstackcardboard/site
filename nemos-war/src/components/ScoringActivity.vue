<template>
  <v-container>
    <v-card>
      <v-card-title primary-title>
        <div>
          <h3 class="headline mb-0">{{scoringActivity.points}}</h3>
        </div>
        <v-col>
          <v-btn @click="toggleAdding">{{addingText.symbol}}</v-btn>
        </v-col>
      </v-card-title>
      <v-card-actions>
        <v-container>
          <v-row>
            <v-col>
              <v-text-field label="Points" type="number" min="0" step="1" v-model="points" />
            </v-col>
            <v-col>
              <v-btn @click="updateScore(points)">{{addingText.text}}</v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col v-for="(value, index) in scoringActivity.possibleValues" :key="index">
              <v-btn color="purple darken-4" @click="updateScore(value)">{{ value}}</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import modificationType from "../models/modificationType";

function calculatePoints(modifier, scoringActivityType, basePoints) {
  let calculatedPoints = 0;
  if (modifier.modificationType === modificationType.add) {
    calculatedPoints = basePoints + modifier.modificationValue;
  } else if (modifier.modificationType === modificationType.subtract) {
    calculatedPoints = basePoints - modifier.modificationValue;
  } else if (modifier.modificationType === modificationType.multiply) {
    calculatedPoints = basePoints * modifier.modificationValue;
  }

  return calculatedPoints < 0 ? 0 : calculatedPoints;
}

export default {
  props: {
    motive: Object,
    scoringActivity: Object,
    store: Object
  },
  data: () => ({
    adding: true,
    points: 0
  }),
  computed: {
    addingText: function() {
      return this.adding
        ? { symbol: "+", text: "Add" }
        : { symbol: "-", text: "Subtract" };
    }
  },
  methods: {
    toggleAdding() {
      this.adding = !this.adding;
    },
    updateScore(basePoints) {
      basePoints = parseInt(basePoints);
      const modifier = this.motive.scoringModifiers.filter(
        x => x.scoringActivityType === this.scoringActivity.type
      )[0];
      if (!modifier) {
        return;
      }

      const calculatedPoints = calculatePoints(
        modifier,
        this.scoringActivity.type,
        basePoints
      );

      const scoringActivity = this.store.state.scoringActivities.filter(
        x => x.type === this.scoringActivity.type
      )[0];
      if (!scoringActivity) {
        return;
      }

      if (this.adding) {
        scoringActivity.points += calculatedPoints;
      } else {
        scoringActivity.points -= calculatedPoints;
      }

      if (scoringActivity.points < 0 && !scoringActivity.allowNegative) {
        scoringActivity.points = 0;
      }

      this.points = 0;
    }
  }
};
</script>

<style>
</style>