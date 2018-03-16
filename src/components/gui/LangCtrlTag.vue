<template>
<div class="lang-ctrl" v-on:click="focusOnSelect">
  <div>
    <label for="lang-ctrl-select">
      {{ getLabel('components.gui.langctrl.label') }}
    </label>
  </div>
  <div>
    <select name="lang-ctrl-select" ref="selectTag" v-model="selLang">
      <option v-for="option in langOptions" v-bind:key="option"
        v-bind:value="option">
          {{ getLabel('services.applocale.lang.' + option) }}
      </option>
    </select>
  </div>
</div>
</template>

<script>
import AppLocaleService from '../../services/AppLocaleService.js';

export default {
  name: 'LangCtrlTag',
  
  props: {
    
  },
  
  computed: {
    langOptions: function() {
      return AppLocaleService.getLanguages();
    }
  },
  
  data: function() {
    return { selLang: AppLocaleService.getLanguage() }
  },
  
  watch: {
    selLang: function(newVal) {
      AppLocaleService.setLanguage(newVal);
    }
  },
  
  methods: {
    focusOnSelect: function() {
      this.$refs.selectTag.focus();
    }
  }
  
}
</script>


<style>
.lang-ctrl {
  background-color: #26A69A;
  display: inline-block;
  padding: 10px;
  color: #FFFFFF;
  text-align: left;
}

.lang-ctrl select {
  min-width: 8em;
  border: none;
  background: transparent;
  color: #FFFFFF;
  font-weight: bold;
}

.lang-ctrl select>option {
  color: #000000;
}
</style>
