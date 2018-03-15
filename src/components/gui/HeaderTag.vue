<template>
  <div class="header-tag">
    <div>
    </div>
    <div>
      <lang-ctrl></lang-ctrl>
    </div>
  </div>
</template>

<script>
import LangCtrlTag from './LangCtrlTag.vue';

export default {
  name: 'HeaderTag',
  
  props: {
    
  },
  
  components: {
    'lang-ctrl': LangCtrlTag
  }
}
</script>


<style >
  
</style>
