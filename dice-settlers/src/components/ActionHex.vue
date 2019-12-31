<template>
  <v-container>
    <v-card>
      <h1>
        {{ actionHex.activeSide.title }}
      </h1>
      <v-card-text>
        <p>{{ body }}</p>
        <ul>
          <li v-for="(priority, index) in priorities" :key="index">
            {{ priority }}
          </li>
        </ul>
        <p v-for="(step, index) in steps" :key="index">
          {{ step }}
        </p>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>
export default {
  computed: {
    actionHex() {
      return this.$store.state.actionHex;
    },
    steps() {
      return this.actionHex.activeSide.instructions().steps;
    },
    body() {
      return this.actionHex.activeSide.instructions().body;
    },
    priorities() {
      return this.actionHex.activeSide.instructions().priorities;
    }
  }
};
</script>
