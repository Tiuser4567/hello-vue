<template>
<div id="app">
  <component v-bind:is="currentView"> </component>
</div>
</template>

<script>
import Screen001 from './components/screens/Screen001.vue';
import LanguageOptions from './services/LanguageOptions.js';


export default {
  name: 'app',
  data: function() {
    console.log(LanguageOptions);
    LanguageOptions.setLanguage("zh");
    console.log(LanguageOptions.getLanguage());
    return { currentView: Screen001 };
  }
}
</script>

<style>
#app {
  
}
</style>
