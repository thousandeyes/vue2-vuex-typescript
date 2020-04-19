<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <form class="increment-selection">
      <label>Select increment:</label>
      <input v-model="incrementStr" type="number">
    </form>
    <Counter :wrapper="wrapper"/>
    <BetterCounter :wrapper="wrapper"/>
    <ClassyCounter :wrapper="wrapper"/>
    <ClassierCounter :wrapper="wrapper"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Counter from './components/Counter.vue';
import BetterCounter from './components/BetterCounter.vue';
import ClassyCounter from './components/ClassyCounter.vue';
import ClassierCounter from './components/ClassierCounter.vue';

export default Vue.extend({
  components: {
    Counter,
    BetterCounter,
    ClassyCounter,
    ClassierCounter,
  },
  data() {
    return {
      incrementStr: 3,
    };
  },
  computed: {
    wrapper(this: { incrementStr: string }) {
      return { increment: +this.incrementStr };
    },
  },
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.increment-selection {
  margin-bottom: 20px;

  input {
    margin-left: 10px;
  }
}

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
