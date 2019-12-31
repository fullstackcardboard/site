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
      <action-hex> </action-hex>
    </v-content>
  </v-app>
</template>

<script>
import ActionHex from "./components/ActionHex";
import store from "./store"

export default {
  name: "App",
  store,
  components: {
    "action-hex": ActionHex
  }
};
</script>
