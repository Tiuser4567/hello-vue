<template>
<span v-if="tagData.readonly">{{readOnlyValue}}</span> 
<div v-else class="radio-grp-tag">
  <div v-for="([key, val], index) in lookupArray" v-bind:key="key">
    <input v-bind:name="tagData.name" 
           v-bind:id="index == 0? tagData.id : tagData.id + '_' + index" 
           type="radio" v-bind:value="key" v-model="tagData.value"  />
    <label v-bind:for="index == 0? tagData.id : tagData.id + '_' + index">{{ getLabel(val) }}</label>
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
  
  data: function() {
    let tagData =  {
        value: this.value,
        type: this.type,
        name: this.name,
        id: this.id,
        placeholder: this.placeholder,
        readonly: this.readonly,
        size: this.size,
        lookupArray: this.lookupArray
    };
    
    // set values from input item if not overridden
    for (let key in this.inputItem) {
      if (this.inputItem.hasOwnProperty(key) && 
          tagData[key] == null && this.inputItem != null) {
        tagData[key] = this.inputItem[key];
      }
    }
    
    return {
      tagData: tagData
    };
  },
  
  watch: {
    'tagData.value': function(newVal) {
      this.$emit('change', this.inputItem.clone({value: newVal}));
    }
  }
}
</script>


<style>
</style>
