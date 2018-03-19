<template>
<div class="header-tag">
  <div class="title">{{ title }}</div>
  <div class="left"></div>
  <div class="right">
    <lang-ctrl></lang-ctrl>
  </div>
</div>
</template>

<script>
import LangCtrlTag from './LangCtrlTag.vue';

export default {
  name: 'HeaderTag',
  
  props: {
    title: {
      type: String,
      default: 'Title'
    }
  },
  
  components: {
    'lang-ctrl': LangCtrlTag
  }
}
</script>


<style>
.header-tag .title {
  background-color: darkslateblue;
  color: white;
  font-weight: bold;
  margin-bottom: 1em;
  padding: 0.5em;
}

.header-tag .left {
  display: inline-block;
  width: 50%;
}

.header-tag .right {
  display: inline-block;
  width: 50%;
  text-align: right;
}

.header-tag .right>.lang-ctrl {
  margin-right: 4em;
}
</style>
