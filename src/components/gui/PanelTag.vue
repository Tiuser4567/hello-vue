<template>
<div class="paneltag">
  <div class="title-bar">{{title}}</div>
  <div class="button-bar">
    <slot name="buttons" />test
  </div>
  <div class="panel-content">test
    <slot />
  </div>
</div>
</template>

<script>
  export default {
    props: {
      title: {default: "Panel Title"}
    },
    name : "PanelTag",
    data : function() {
      return {};
    }
  }
</script>

<style>
.paneltag {
  display: block;
}

.paneltag .title-bar {
  display: inline-block;
  width: 50%;
  text-align: left;
}

.paneltag .button-bar {
  display: inline-block;
  width: 50%;
  text-align: right;
}
</style>