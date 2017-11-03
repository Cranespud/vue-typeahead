<template>
  <div id="app">
    <typeahead 
        v-model="match"
        @change="getMatchingProducts"
        :matches="matches"  
        :labelAttr="'name'"
        :extractLabel="extractLabel">
    </typeahead>
      <button @click="cleanMatch">Clean</button>
      <br><br><br><br><br><br><br><br><br><br>{{match}}
  </div>
</template>

<script>
import VueTypeahead from '../src/vue-typeahead.vue'

const matches = [
    { name: "label 123", value: 123},
    { name: "label 321", value: 321 } 
]; 

export default {
  name: 'app',
  components: {
      typeahead: VueTypeahead
  },
  data () {   
    return {
      matches: [],
      match: null,
      msg: 'Welcome to Your Vue.js App'
    };
  },
  methods: { 
      extractLabel(match) {
          return match.name;
      },
      
      getMatchingProducts() {                 
        this.matches = [];
        console.log('getting matches');
        setTimeout(() => this.matches = ['hola', 'mundo'], 0);
      },
      
      cleanMatch() {
          this.match = '';
      }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  width: 400px;
  margin: 0 auto;
}

h1, h2 {
  font-weight: normal;
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
