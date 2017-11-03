import VueTypeahead from './vue-typeahead.vue';

module.exports = {
  install: function (Vue, options) {
    Vue.component('typeahead', VueTypeahead);
  }
};