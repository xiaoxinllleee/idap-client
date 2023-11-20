<template>
  <div id="app">
    <rwxq/>
  </div>
</template>

<script>
  import rwxq from './rwxq'
  export default {
    name: 'App',
    components: {
      rwxq
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
  .link{
    font-size: 13px;
    margin-left: 10px;
  }
  .link a{
    color: #5272FF;
  }
  .link .center{
    margin-left: 10px;
  }
</style>
