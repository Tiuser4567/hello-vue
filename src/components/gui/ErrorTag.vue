<template>
  <div class="error-tag">
    <div class="error-container" v-if="errors.length > 0">
      <ul class="msgs">
        <li v-for="(value, index) in errors" v-bind:key="index">
          <span v-if="!value.item">{{getErrorMessage(value)}}</span>
          <span v-else v-html="getErrorMessage(value)"></span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ErrorTag',
  
  props: {
    errors: {
      type: Array,
      default: function() {
        return []; 
      }
    }
  },
  
  methods: {
    getErrorMessage: function(value) {
      let error = value.error;
      if (typeof error === "string") {
        return this.getLabel(error);
      }
     
      let args = [];
      var errKey = null;
      
      //add error message key
      for (let prop in error) {
        if (error.hasOwnProperty(prop)) {
          errKey = prop;
          args.push(errKey);
          break;
        }
      }
     
      //if has item, set the first argument in error message to label wrapper
      if (value.item) {
        let item = value.item;
        args.push('<label for="' + item.name + '">' + this.getLabel(item.label) + '</label>');
      }
      
      //add other args
      let msgArgs = error[errKey];
      for (let i = 0, size = msgArgs.length; i < size; i++) {
        args.push(msgArgs[i]);
      }
      
      return this.getLabel.apply(this, args);
    }
  }
}
</script>


<style >
  .error-tag {
  }
  
  .error-tag > .error-container {
    max-height: 3em;
    background-color: red;
    color: white;
    padding: 10px 0px;
    margin: 10px 0px;
    overflow: auto;
  }
  
  .error-tag > .error-container > .msgs {
    margin: 0px;
  }
  
  .error-tag > .error-container > .msgs label {
    font-weight: bold;
    text-decoration: underline;
    cursor: pointer;
  }
</style>
