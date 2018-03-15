<template>
<div class="panel-tag">
  <div class="panel-header">
    <div class="title-bar">
      <icon v-bind:name="icon"></icon>
      <span class="panel-title">{{title}}</span>
    </div>
    <div class="button-bar">
      <slot name="buttons" />
    </div>
    <div class="toggle-bar">
      <button v-on:click="togglePanel">
        <icon v-bind:name="toggleIcon"></icon>
      </button>
    </div>
  </div>
  <div v-show="contentShown" class="panel-content">
    <slot />
  </div>
</div>
</template>

<script>
import Icon from 'vue-awesome/components/Icon';

export default {
  name : "PanelTag",
  
  props: {
    title: {
      type: String,
      default: "Panel Title"
    },
    icon: {
      type: String,
      default: "user"
    },
    contentShownOnLoad: {
      type: Boolean,
      default: true
    }
  },
  
  computed :{
    toggleIcon: function() {
      return this.contentShown? "angle-up": "angle-down";
    },
    
  },
  
  methods : {
    togglePanel: function() {
      this.contentShown = !this.contentShown;
    }
  },
  
  data : function() {
    return {
      contentShown: this.contentShownOnLoad
    };
  },
  
  components : {
    'icon': Icon
  }
}
</script>

<style>
.panel-tag {
  display: block;
  padding: 5px;
}

.panel-tag .panel-header {
  margin-bottom: 5px;
}

.panel-tag .title-bar {
  display: inline-block;
  width: 50%;
  text-align: left;
}

.panel-tag .title-bar>.panel-title {
  margin-left: 1em;
}

.panel-tag .button-bar {
  display: inline-block;
  width: 40%;
  text-align: right;
}

.panel-tag .toggle-bar {
  display: inline-block;
  width: 10%;
  text-align: right;
}

.panel-tag .fa-icon {
  vertical-align: top;
}
</style>