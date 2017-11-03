<template>
  <div id="app">
    <typeahead 
        v-model="match"
        :matches="matches"        
        labelAttr="name">                
    </typeahead>
      <button @click="cleanMatch">Clean</button>
      <br><br><br><br><br><br><br><br><br><br>{{match}}
  </div>
</template>

<script>
import VueTypeahead from './components/vue-typeahead.vue'

export default {
  name: 'app',
  components: {
      typeahead: VueTypeahead
  },
  data () {
    var matches = [
        { name: 123, value: 123},
        { name: 321, value: 321 }
    ];
    
    return {
      matches: matches,
      match: null,
      msg: 'Welcome to Your Vue.js App'
    };
  },
  methods: {      
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
