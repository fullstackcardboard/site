<template>
  <div class="col-sm-3 col">
    <v-btn color="dark" @click="$emit('add-die-clicked', die)"
      ><img :src="die.image" alt="" />{{ die.title }}</v-btn
    >
  </div>
</template>

<script>
export default {
  props: {
    die: Object
  }
};
</script>
