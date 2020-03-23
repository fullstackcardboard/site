<template>
  <div id="app">
    <nav class="navbar navbar-dark bg-dark text-white sticky-top mb-2">
      <a class="navbar-brand" href="#">
        Too Many Bones - Create an Adventure
      </a>
      <div>
        <ul class="list-unstyled">
          <li>
            <router-link to="/edit">Edit</router-link>
          </li>
        </ul>
      </div>
    </nav>
    <router-view id="main" />
  </div>
</template>

<style>
@import "//stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-image: url("./assets/barnacle.png");
  background-position: center;
  background-attachment: fixed;
}
</style>
