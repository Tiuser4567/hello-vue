<template>
<div>
  <div class="title">{{ getLabel('screens.screen001.title') }}</div>
  <header-tag></header-tag>
  <error-tag></error-tag>
  <div class="content">
    <panel-tag v-bind:title="'<user> Profile'" icon="user">

    </panel-tag>
    <panel-tag v-bind:title="'Other Details'" icon="list-ul">

    </panel-tag>
  </div>
</div>
</template>

<script>
import PanelTag from '../gui/PanelTag.vue';
import HeaderTag from '../gui/HeaderTag.vue';
import ErrorTag from '../gui/ErrorTag.vue';

export default {
  name: 'Screen001',
  
  data: function() {
    return {};
  },
  
  components: {
    'header-tag': HeaderTag,
    'error-tag': ErrorTag,
    'panel-tag': PanelTag
  }
}
</script>


<style>
</style>
