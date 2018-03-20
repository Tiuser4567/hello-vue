<template>
<div class="modal-tag">
  <div class="overlay" ></div>
  <div ref="modalBody" class="modal-body" v-bind:style="modalStyles">
    <div ref="modalHeader" class="modal-header">
      <div class="title">{{modalTitle}}</div>
      <div class="close" v-on:click="closeModal">
        <icon name="times" scale="1.1"></icon>
      </div>
    </div>
    <div ref="modalContent" class="modal-content">
      <component v-bind:is="modalScreen" v-on:modalCreate="getModalInfo"
        v-on:modalClose="closeModal" v-on:modalUpdate="updateModal">
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
    modalScreen: {}
  },
  data: function() {
    let windowHeight = window.innerHeight;
    let windowWidth = window.innerWidth;
    let modalWidth = 500;
    let modalHeight = 360;
    let modalTop = Math.max((windowHeight / 2) - (modalHeight / 2), 20);
    let modalLeft = Math.max((windowWidth / 2) - (modalWidth / 2), 20);
    
    return { title: "",
             modalTop: modalTop,
             modalLeft: modalLeft,
             modalWidth: modalWidth,
             modalHeight: modalHeight,
             windowWidth: windowWidth,
             windowHeight: windowHeight,
             modalBodyOverflow: false,
             adjustSizeInterval: -1
            };
  },
  components: {
    'icon': Icon
  },
  computed: {
    modalTitle: function() {
      if (this.title != null && this.title != "") {
        return this.getLabel(this.title);
      }
      return null;
    },
    modalStyles: function() {
      let styles = {};
      
      styles['top'] =  this.modalTop + 'px';
      styles['left'] =  this.modalLeft + 'px';
      
      if (this.modalHeight == null) {
        styles['height'] = 'auto';
      } else {
        styles['height'] = this.modalHeight + 'px';
      }
      if (this.modalWidth == null) {
        styles['width'] = 'auto';
      } else {
        styles['width'] = this.modalWidth + 'px';
      }
      
      if (this.modalBodyOverflow) {
        styles['overflow'] = 'auto';
      }
      
      return styles;
    }
  },

  mounted() {
    let self = this;
    this.$nextTick(function() {
      window.addEventListener('resize', function(/*e*/) {
        self.windowHeight = window.innerHeight;
        self.windowWidth = window.innerWidth;
      });
    });
    
    this.adjustSize();
    this.adjustSizeInterval = setInterval(function(){
      this.adjustSize.bind(this)();
    }.bind(this), 1000);
  },
  
  destroyed: function() {
    clearInterval(this.adjustSizeInterval);
    this.adjustSizeInterval = -1;
  },
  
  methods: {
    getModalInfo: function(info) {
      this.title = info.title;
    },
    closeModal: function(returnData) {
      clearInterval(this.adjustSizeInterval);
      this.adjustSizeInterval = -1;
      
      if (!returnData) {
        returnData = {}
      }
      returnData.modalId = this.modalScreen.name;
      this.$emit('modalClose', returnData);
    },
    
    updateModal: function(returnData) {
      if (!returnData) {
        returnData = {};
      }
      returnData.modalId = this.modalScreen.name;
      this.$emit('modalUpdate', returnData);
    },
    
    adjustSize: function() {
      if (this.adjustInterval != -1) {
        let newHeight = Math.min(this.$refs.modalHeader.clientHeight + this.$refs.modalContent.clientHeight, this.windowHeight - 40);
        this.modalBodyOverflow = newHeight == this.windowHeight - 40;
        
        if (newHeight != this.modalHeight) {
          this.modalHeight = newHeight; 
          this.modalTop = Math.max((this.windowHeight / 2) - (this.modalHeight / 2), 20);
        }
        
        let newLeft = Math.max((this.windowWidth / 2) - (this.modalWidth / 2), 20);
        if (newLeft != this.modalLeft) {
          this.modalLeft = newLeft;
        }
      }
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
  background: rgba(0, 0, 0, 0.5);
}

.modal-tag .modal-body {
  background: white;
  position: fixed;
}

.modal-tag .modal-header {
  border-bottom: 1px solid lightgray;
  height: 2.5em;
  padding-left: 10px;
}

.modal-tag .modal-header .title {
  display: inline-block;
  width: 95%;
  font-size: 1em;
  font-weight: bold;
  padding-top: 0.6em;
}

.modal-tag .modal-header .close {
  text-align: center;
  display: inline-block;
  width: 5%;
  height: 100%;
  padding-top: 0.6em;
}

.modal-tag .modal-content {
  margin-top: 0.5em;
  padding-bottom: 0.5em;
  overflow: auto;
  background: white;
}

.modal-tag .form-label {
  width: 30%;
}

.modal-tag .form-input {
  width: 70%;
}
</style>