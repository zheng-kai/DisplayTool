<template>
  <div id="app">
    <MainComp msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import MainComp from './components/MainComp.vue';

export default {
  name: 'App',
  components: {
    MainComp,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
