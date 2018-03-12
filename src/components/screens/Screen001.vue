<template>
<div>
  <div class="menu">Menu</div>
  <div class="header"></div>
  <div class="error">Error</div>
  <div class="content">
  <PanelTag></PanelTag>
  </div>
</div>
</template>

<script>
import LanguageOptions from '../../services/LanguageOptions.js';
import PanelTag from '../gui/PanelTag.vue';

export default {
  name: 'Screen001',
  data: function() {
    return {msg: 'test'};
  },
  components: {
    'PanelTag': PanelTag
  }
}
</script>


<style>
</style>
