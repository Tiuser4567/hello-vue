<template>
  <div class="error-tag">
    <ul v-if="errors.length > 0" class="msgs">
      <li v-for="(value, index) in errors" v-bind:key="index">
        <label v-bind:for="value.fieldName">{{value.fieldName}}</label> is a required field.
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ErrorTag',
  
  props: {
    errors: {
      type: Array,
      default: function() {
        return [{fieldName: 'test'}, {fieldName: 'test'}, {fieldName: 'test'}, {fieldName: 'test'}]; 
      }
    }
  }
}
</script>


<style >
  .error-tag {
    max-height: 3em;
    background-color: red;
    color: white;
    padding: 10px 0px;
    margin: 10px 0px;
    overflow: auto;
  }
  
  .error-tag .msgs {
    margin: 0px;
  }
</style>
