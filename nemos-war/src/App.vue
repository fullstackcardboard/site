<template>
  <v-app>
    <v-app-bar app color="light" dark>
      <div class="d-flex align-center">
        <a href="https://fullstackcardboard.com">
          <v-img
            alt="Vuetify Logo"
            class="shrink mr-2"
            contain
            src="../../content/images/logo_transparent.png"
            transition="scale-transition"
            width="40"
          />
        </a>
      </div>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-content color="dark">
      <v-container v-if="motiveSelected">
        <v-card>
          <v-card-title primary-title>
            <div>
              <h3>{{store.state.motive.type}}</h3>
              <h3 class="headline mb-0">
                Total Points
                <h5>{{store.state.totalPoints}}</h5>
              </h3>
            </div>
          </v-card-title>
        </v-card>
        <v-expansion-panels>
          <v-expansion-panel
            v-for="(scoringActivity, index) in store.state.scoringActivities"
            :key="index"
          >
            <v-expansion-panel-header>
              <v-img
                :src="require(`@/assets/${scoringActivity.imageUrl}`)"
                max-width="50"
                max-height="50"
                style="border-radius: 66%"
              ></v-img>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <ScoringActivity
                :motive="store.state.motive"
                :scoringActivity="scoringActivity"
                :store="store"
              />
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-container>
      <v-container v-else-if="!motiveSelected">
        <MotivePicker :store="store" />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import ScoringActivity from "./components/ScoringActivity";
import MotivePicker from "./components/MotivePicker";
import store from "./store";

export default {
  name: "App",

  components: {
    ScoringActivity,
    MotivePicker
  },

  data: () => ({
    store
  }),
  computed: {
    motiveSelected() {
      return this.store.state.motive != null;
    }
  }
};
</script>
