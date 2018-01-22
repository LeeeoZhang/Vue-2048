<template>
  <div id="app">
    <!-- <h1>2048 Game In Vue.js</h1> -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
html,body {
  background: #faf8f0;
}
* {
  margin: 0; 
  padding: 0;
}
ul,ol {
  list-style: none;
}
a {
  text-decoration: none;
}
</style>
