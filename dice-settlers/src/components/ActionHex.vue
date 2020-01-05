<template>
  <v-container>
    <v-card v-for="(side, index) in actionHex.sides" :key="index" class="mb-2">
      <h1 :style="{ backgroundColor: getSideColor(side) }">
        {{ side.title }} {{ side.dice.length }}
      </h1>
      <v-card-text>
        <p>{{ side.instructions().body }}</p>
        <ul>
          <li
            v-for="(priority, index) in side.instructions().priorities"
            :key="index"
          >
            {{ priority }}
          </li>
        </ul>
        <p v-for="(step, index) in side.instructions().steps" :key="index">
          {{ step }}
        </p>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>
export default {
  props: {
    actionHex: Object
  },
  methods: {
    getSideColor(side) {
      if (side == this.actionHex.activeSide) {
        return "green";
      }

      return "";
    }
  }
};
</script>
