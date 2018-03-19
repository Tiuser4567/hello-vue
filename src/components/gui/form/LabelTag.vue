<template>
  <label class="label-tag" 
         v-bind:for="tagData.forAtt">
     {{ labelComp }}<span v-if="tagData.mandatory && !tagData.readonly" class="mandatory">*</span>
     <span v-if="tagData.hasColon" class="colon">:</span>
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
      required: true
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
  
  data: function() {
    let tagData =  {
        forAtt: this.forAtt,
        label: this.label,
        hasColon: this.hasColon,
        mandatory: this.mandatory,
        readonly: this.readonly
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
    inputItem: function(newVal) {
      //update the internal value with the new value
      let propsSet =  {
          forAtt: newVal.forAtt,
          label: newVal.label,
          hasColon: newVal.hasColon,
          mandatory: newVal.mandatory,
          readonly: newVal.readonly
      };
      
      for (let key in propsSet) {
        if (propsSet[key] != null) {
          this.tagData[key] = propsSet[key];
        }
      }
      
      if (this.tagData.forAtt == null) {
        this.tagData.forAtt = this.tagData.name;
      }
      
      if (this.tagData.label == null) {
        this.tagData.label = this.tagData.name;
      }
    }
  },
  
  computed: {
    labelComp: function() {
      return this.getLabel(this.tagData.label);
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
