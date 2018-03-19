<template>
<div id="app">
   <component v-bind:is="currentView"> </component> 
</div>
</template>

<script>
import 'vue-awesome/icons/user';
import 'vue-awesome/icons/list-ul';
import 'vue-awesome/icons/angle-up';
import 'vue-awesome/icons/angle-down';
import 'vue-awesome/icons/times';

import Vue from 'vue';
import LabelMixin from './mixins/LabelMixin.vue';
import Screen001 from './components/screens/Screen001.vue';
import AppLocaleService from './services/AppLocaleService.js';

Vue.mixin(LabelMixin);

export default {
  name: 'app',
  
  data: function() {
    return { 
      AppLocaleService: AppLocaleService,
      currentView: Screen001, 
    };
  },
  
  components: {
    
  }
}
</script>

<style>
body {
  margin: 0px;
}

#app {
  
}

.form-label {
  display: inline-block;
  text-align: right;
  width: 20%;
  vertical-align: top;
  padding-bottom: 0.5em;
}

.form-input {
  display: inline-block;
  text-align: left;
  width: 70%;
  padding-bottom: 0.5em;
}
</style>
