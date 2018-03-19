<template>
  <div v-if="modalScreen && modalScreen.visible" class="modal-tag">
    <div class="overlay"></div>
    <div class="modal-body">
      <div class="modal-header">
        <div class="title">{{modalTitle}}</div>
        <div class="close" v-on:click="closeModal()"><icon name="times" scale="1.1"></icon></div>
      </div>
      <div class="modal-content">
        <component v-bind:is="modalScreen" v-on:close="closeModal" v-on:update="updateModal">
        </component>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from 'vue-awesome/components/Icon';

export default {
  name: 'ModalTag',
  props: {
    modalScreen: {
    },
    title: {
      type: String,
      default: function() {
        if (this.modalScreen) {
          return this.modalScreen.title;
        }
        return null;
      }
    }
  },
  computed: {
    modalTitle: function() {
      if (this.title != null && this.title != "") {
        return this.getLabel(this.title);
      }
      return null;
    }
  },
  data: function() {
    return {};
  },
  components: {
    'icon': Icon
  },
  methods: {
    closeModal: function(returnData) {
      if (!returnData) {
        returnData = {}
      }
      returnData.modalId = this.modalScreen.name;
      this.$emit('close', returnData);
    },
    
    updateModal: function(returnData) {
      if (!returnData) {
        returnData = {}
      }
      returnData.modalId = this.modalScreen.name;
      this.$emit('update', returnData);
    }
  }
}
</script>

<style>
  .modal-tag .overlay {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0px;
    background: rgba(0,0,0,0.5);
  }
  
  .modal-tag .modal-body {
    background: white;
    position: fixed;
    top: 20px;
    left: 30%;
    width: 500px;
    height: 500px;
  }
  
  .modal-tag .modal-header {
    border-bottom: 1px solid lightgray;
    padding: 0.5em;
   }
  
  .modal-tag .modal-header .title {
    display: inline-block;
    width: 95%;
    font-size: 1em;
    font-weight: bold;
  }
  
  .modal-tag .modal-header .close {
    display: inline-block;
    width: 5%;
  }
</style>