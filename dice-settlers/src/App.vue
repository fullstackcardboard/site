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
      <v-btn
        @click="
          () => {
            displayKey = 'hex';
          }
        "
        >Action Hex</v-btn
      >
      <v-btn
        @click="
          () => {
            displayKey = 'dice';
          }
        "
        >Add Dice</v-btn
      >
      <die-roller v-on:die-rolled="handleDieRolled" />
      <v-container v-if="displayActionHex">
        <action-hex :actionHex="actionHex" />
      </v-container>
      <v-container v-if="displayAddDiceButtons">
        <add-die-button
          v-for="(die, index) in dice"
          :key="index"
          :die="die"
          v-on:add-die-clicked="handleAddDieClicked"
        />
      </v-container>
    </v-content>
    <v-footer>
      <v-spacer></v-spacer>
      <div>&copy; {{ new Date().getFullYear() }}</div>
    </v-footer>
  </v-app>
</template>

<script>
import ActionHexComponent from "./components/ActionHex";
import DieRollerComponent from "./components/DieRoller";
import AddDieButton from "./components/AddDieButton";
import store from "./store";
import ActionHex from "./models/actionHex";
import dice from "./data/dice";

const actionHex = new ActionHex();
export default {
  name: "App",
  data() {
    return {
      actionHex,
      displayKey: "hex",
      dice
    };
  },
  computed: {
    displayActionHex() {
      return this.displayKey === "hex";
    },
    displayAddDiceButtons() {
      return this.displayKey === "dice";
    }
  },
  store,
  components: {
    "action-hex": ActionHexComponent,
    "die-roller": DieRollerComponent,
    "add-die-button": AddDieButton
  },
  methods: {
    handleDieRolled(dieResult) {
      this.actionHex.setActiveSide(dieResult);
    },
    handleAddDieClicked(die) {
      this.actionHex.addDieToSide(die);
    }
  }
};
</script>
