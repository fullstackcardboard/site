<template>
  <v-container>
      <div class="col d-block">
        <v-btn color="dark" @click="roll" :disabled="rolling">Roll</v-btn>
      </div>
      <div class="col" v-if="rolling">
        <p v-html="dieFace" style="font-size: 15vh;"></p>
      </div>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      rolling: false,
      dieFace: ""
    };
  },
  methods: {
    roll() {
      const dieFaces = [1, 2, 2, 3, 3, 4];
      this.rolling = true;
      // Set an interval to simulate the dice roll
      let index = 0;
      let interval = setInterval(() => {
        let die = dieFaces[Math.floor(Math.random() * dieFaces.length)];
        index++;
        this.dieFace = `&#x268${die - 1};`;
        if (index + 1 === 7) {
          clearInterval(interval);
          this.rolling = false;
          this.$emit("die-rolled", die);
        }
      }, 150);
    }
  }
};
</script>
