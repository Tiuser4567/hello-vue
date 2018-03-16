<template>
<div class="radio-grp-tag">
  <div v-for="([key, val], index) in lookup" v-bind:key="key">
    <input v-bind:name="name" v-bind:id="index == 0? id : id + '_' + index" 
           type="radio" v-bind:value="key" v-model="selected"  />
    <label v-bind:for="index == 0? id : id + '_' + index">{{ val }}</label>
  </div>
</div>
</template>

<script>
import InputTag from './InputTag.vue';

export default {
  extends: InputTag,
  name: 'RadioGrpTag',
  
  model: {
    prop: 'inputItem',
    event: 'change'
  },
  
  props: {
    lookup: {
      type: Array,
      default: function() {
        if (this.inputItem != null && this.inputItem.lookup != null) {
          return Array.from(this.inputItem.lookup);
        }
        
        return Array.from(new Map());
      }
    }
  },
  
  data: function() {
    return {
      selected: []
    };
  },
  
  watch: {
    selected: function(newVal) {
      this.$emit('change', Object.assign({}, this.inputItem, {value: newVal}));
    }
  }
}
</script>


<style>
</style>
