<template>
<span v-if="tagData.readonly">{{readOnlyValue}}</span> 
<div v-else class="textarea-tag">
  <textarea ref="textarea" v-bind:rows="tagData.rows" v-bind:name="tagData.name" v-bind:id="tagData.id" 
  v-model.lazy="tagData.value" v-bind:placeholder="placeholderComp"></textarea>
</div>
</template>

<script>
import InputTag from './InputTag.vue';

export default {
  extends: InputTag,
  name: 'TextAreaTag',
  
  model: {
    prop: 'inputItem',
    event: 'input'
  },
  
  props: {
    rows: {
      type: Number,
      default: 4
    }
  },
  
  data: function() {
    let tagData =  {
        value: this.value,
        type: this.type,
        name: this.name,
        id: this.id,
        placeholder: this.placeholder,
        readonly: this.readonly,
        rows: this.rows
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
      let formattedValue = newVal;
      
      if (newVal != null) {
        formattedValue = newVal.trim();
        
        if (formattedValue != newVal) {
          this.$refs.textarea.innerHTML = formattedValue;
        }
      }
      
      this.$emit('input', this.inputItem.clone({value: formattedValue}));
    }
  }
}
</script>


<style>
  .textarea-tag textarea {
    width: 99%;
  }
</style>
