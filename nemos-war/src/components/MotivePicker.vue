<template>
  <v-container>
    <v-col>
      <v-select
        :items="store.state.motives"
        item-text="type"
        item-value="type"
        v-model="store.state.motive"
        label="Motives"
        return-object
      ></v-select>
    </v-col>
  </v-container>
</template>

<script>
export default {
  props: {
    store: Object
  }
};
</script>

<style>
</style>