<template>
  <div id="app">
    <h1>2048 Game In Vue.js</h1>
    <router-view/>
    <p class="score">Score: {{score}}</p>
  </div>
</template>

<script>
export default {
  name: 'App',
  created(){
    console.log(this.score)
  },
  computed: {
    score () {
      return this.$store.state.score
    },
  }
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
.score,h1 {
  width: 503px;
  margin: 0 auto;
  font-size: 30px;
  font-weight: bold;
}
h1 {
  margin: 20px auto 10px auto;
}
</style>
