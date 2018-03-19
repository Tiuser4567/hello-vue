<template>
<span v-if="tagData.readonly">{{readOnlyValue}}</span> 
<input v-else v-bind:name="tagData.name" v-bind:id="tagData.id" class="input-tag"
  ref="input" v-bind:value="tagData.value"
  v-on:input="updateValue($event.target.value)"
  v-on:change="trimValue($event.target.value)" v-bind:type="tagData.type"
  v-bind:placeholder="placeholderComp"
  v-bind:size="tagData.size" /> 
</template>

<script>
export default {
  name: 'InputTag',
  
  model: {
    prop: 'inputItem',
    event: 'input'
  },
  
  props: {
    inputItem: {
      type: Object,
      required: true
    },
    
    value: {
      type: String,
      default: function() {
        if (this.inputItem != null && this.inputItem.value != null) {
          return this.inputItem.value;
        }
        
        return "";
      }
    },
    
    type: {
      type:String,
      default: function() {
        if (this.inputItem != null && this.inputItem.type != null) {
            return this.inputItem.type;
        }
        return "text";
      }
    },
    
    name: {
      type: String,
      default: function() {
        if (this.inputItem != null && this.inputItem.name != null) {
            return this.inputItem.name;
        }
        return null;
      }
    },
    
    id: {
      type: String,
      default: function() {
        return this.name;
      }
    },
    
    placeholder: {
      type: String,
      default: function() {
        if (this.inputItem != null && this.inputItem.placeholder != null) {
            return this.inputItem.placeholder;
        }
        return null;
      }
    },
    
    readonly: {
      type: Boolean,
      default: function() {
        if (this.inputItem != null && this.inputItem.readonly != null) {
          return this.inputItem.readonly;
        }
        return false;
      }
    },
    
    size: {
      default: function() {
        if (this.inputItem != null && this.inputItem.size != null) {
          return this.inputItem.size;
        }
        return null;
      }
    },
    
    lookupArray: {
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
    let tagData =  {
        value: this.value,
        type: this.type,
        name: this.name,
        id: this.id,
        placeholder: this.placeholder,
        readonly: this.readonly,
        size: this.size,
        lookup: this.lookup
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
  
  computed: {
    placeholderComp: function() {
      return this.getLabel(this.tagData.placeholder);
    },
    
    readOnlyValue: function() {
      if (this.tagData.value != null && this.tagData.value != "") {
        if (this.tagData.type == "password") {
          return this.tagData.value.replace(/./g,"*");
        }
        if (this.tagData.lookup == null || this.tagData.lookup.get(this.tagData.value) == null) {
          return this.tagData.value;
        } else {
          return this.getLabel(this.tagData.lookup.get(this.tagData.value));
        }
      }
      return "-";
    }
  },
  
  watch: {
    inputItem: function(newVal) {
      //update the internal value with the new value
      let propsSet =  {
          value: newVal.value,
          type: newVal.type,
          name: newVal.name,
          id: newVal.id,
          placeholder: newVal.placeholder,
          readonly: newVal.readonly,
          size: newVal.size,
          lookup: newVal.lookup
      };
      
      for (let key in propsSet) {
        this.tagData[key] = propsSet[key];
        if (key == 'lookup' && propsSet[key] != null) {
          this.tagData['lookupArray'] = Array.from(propsSet[key]);
        }
      }
      
      if (this.tagData.id == null) {
        this.tagData.id = this.tagData.name;
      }
    }
  },
  
  methods: {
    updateValue: function (value) {
      var formattedValue = value;
      
      if (formattedValue !== value) {
        this.$refs.input.value = formattedValue; 
      }
      this.$emit('input', this.inputItem.clone({value: formattedValue}));
    },
    
    trimValue: function (value) {
      var formattedValue = value;
      
      if (this.type == 'text') {
        formattedValue = value.trim();
      }
      
      if (formattedValue !== value) {
        this.$refs.input.value = formattedValue;
        
        this.$emit('input',  this.inputItem.clone({value: formattedValue}));
      }
    }
  }
}
</script>


<style>
</style>
