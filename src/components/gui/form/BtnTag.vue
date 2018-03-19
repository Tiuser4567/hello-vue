<template>
<button v-on:click="onClick($event)"
  v-bind:class="{'btn-tag': true, 'highlighted': highlight == 'true' }">
  <slot>{{labelComp}}</slot>
</button>
</template>

<script>
export default {
  name: 'BtnTag',
  
  props: {
    highlight: {
      type: String,
      default: 'false'
    },
    label: {
      type: String,
      default: null
    }
  },
  
  computed: {
    labelComp: function() {
      return this.getLabel(this.label);
    }
  },
  
  methods: {
    onClick: function(event) {
      this.$emit('click', event);
    }
  }
}
</script>

<style>
.btn-tag {
  background: #FFFFFF;
  color: #000000;
  border: 0.5px solid black;
  padding: 0.5em 1em;
  margin-left: 5px;
}

.btn-tag.highlighted {
  background: #027BE3;
  color: #FFFFFF;
  border: 0.5px solid #027BE3;
}
</style>