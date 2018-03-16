<template> 
<input v-bind:name="name" v-bind:id="id" class="input-tag"
  ref="input" v-bind:value="value"
  v-on:input="updateValue($event.target.value)"
  v-on:change="trimValue($event.target.value)" v-bind:type="type"
  v-bind:placeholder="placeholderComp" /> 
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
    }
  },
  
  computed: {
    placeholderComp: function() {
      return this.getLabel(this.placeholder);
    }
  },
  
  methods: {
    updateValue: function (value) {
      var formattedValue = value;
      
      if (formattedValue !== value) {
        this.$refs.input.value = formattedValue; 
      }
      
      this.$emit('input', Object.assign({}, this.inputItem, {value: formattedValue}));
    },
    
    trimValue: function (value) {
      var formattedValue = value;
      
      if (this.type == 'text') {
        formattedValue = value.trim();
      }
      
      if (formattedValue !== value) {
        this.$refs.input.value = formattedValue;
        
        this.$emit('input', Object.assign({}, this.inputItem, {value: formattedValue}));
      }
    }
  }
}
</script>


<style>
</style>
