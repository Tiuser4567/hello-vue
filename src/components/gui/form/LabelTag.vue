<template>
  <label class="label-tag" 
         v-bind:for="forAtt">
     {{ labelComp }}<span v-if="mandatory && !readonly" class="mandatory">*</span>
     <span v-if="hasColon" class="colon">:</span>
  </label>
</template>

<script>
export default {
  name: 'LabelTag',
  
  model: {
    prop: 'inputItem'
  },
  
  props: {
    inputItem: {
      type: Object,
      default: null
    },
    
    forAtt: {
      type: String,
      default: function() {
        if (this.inputItem != null && this.inputItem.name != null) {
          return this.inputItem.name;
        }
        return null;
      }
    },
    
    label: {
      type: String,
      default: function() {
        if (this.inputItem != null && this.inputItem.label != null) {
          return this.inputItem.label;
        } else if (this.inputItem != null && this.inputItem.name != null) {
          return this.inputItem.name;
        }
        return null;
      }
    },
    
    hasColon: {
      type: Boolean,
      default: function() {
        if (this.inputItem != null && this.inputItem.hasColon != null) {
          return this.inputItem.hasColon;
        }
        return true;
      }
    },
    
    mandatory: {
      type: Boolean,
      default: function() {
        if (this.inputItem != null && this.inputItem.mandatory != null) {
          return this.inputItem.mandatory;
        }
        return false;
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
    }
  },
  
  computed: {
    labelComp: function() {
      return this.getLabel(this.label);
    }
  }
  
}
</script>


<style>
  .label-tag {
    padding-right: 20px;
  }
  .label-tag .mandatory {
    color: red;
  }
</style>
