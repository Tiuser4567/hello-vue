<template>
<div>
  <header-tag v-bind:title="getLabel('screens.screen001.title')"></header-tag>
  <error-tag v-bind:errors="errors"></error-tag>
  <div class="content">
    <panel-tag
      v-bind:title="getLabel(profileName? 'screens.screen001.profile.hasuser': 'screens.screen001.profile.nouser', profileName)"
      icon="user">
      <form-tag>
        <div class="form-label">
        {{profForm.items.username}}
          <label-tag v-model="profForm.items.username"></label-tag>
        </div>
        <div class="form-input">
          <input-tag class="width_80" v-model="profForm.items.username"></input-tag>
        </div>
        <!-- <div class="form-label">
          <label-tag v-model="profForm.items.pwd"></label-tag>
        </div>
        <div class="form-input">
          <input-tag class="width_80" v-model="profForm.items.pwd"></input-tag>
        </div>
        <div class="form-label">
          <label-tag v-model="profForm.items.fname"></label-tag>
        </div>
        <div class="form-input">
          <input-tag class="width_80" v-model="profForm.items.fname"></input-tag>
        </div>
        <div class="form-label">
          <label-tag v-model="profForm.items.lname"></label-tag>
        </div>
        <div class="form-input">
          <input-tag class="width_80" v-model="profForm.items.lname"></input-tag>
        </div>
        <div class="form-label">
          <label-tag v-model="profForm.items.gender"></label-tag>
        </div>
        <div class="form-input">
          <radio-grp-tag v-model="profForm.items.gender"></radio-grp-tag>
        </div>
        <div class="form-label">
          <label-tag v-model="profForm.items.bday"></label-tag>
        </div>
        <div class="form-input">
          <input-tag class="width_80" size="100" v-model="profForm.items.bday"></input-tag>
        </div> -->
      </form-tag> 
      <div slot="buttons">
        <btn-tag v-if="profForm.editMode" v-on:click="doCancel(profForm)">Cancel</btn-tag>
        <btn-tag v-if="profForm.editMode" v-on:click="doSave(profForm)" highlight="true">Save</btn-tag>
        <btn-tag v-if="!profForm.editMode" v-on:click="doEdit(profForm)">Edit</btn-tag>
      </div>
    </panel-tag>
    <panel-tag v-bind:title="getLabel('screens.screen001.otherdetails')"
      icon="list-ul"> 
      
    </panel-tag>
  </div>
</div>
</template>

<script>
import PanelTag from '../gui/PanelTag.vue';
import HeaderTag from '../gui/HeaderTag.vue';
import ErrorTag from '../gui/ErrorTag.vue';
import InputTag from '../gui/form/InputTag.vue';
import FormTag from '../gui/form/FormTag.vue';
import LabelTag from '../gui/form/LabelTag.vue';
import RadioGrpTag from '../gui/form/RadioGrpTag.vue';
import BtnTag from '../gui/form/BtnTag.vue';
import FormModel from '../model/FormModel.js';
import InputItemModel from '../model/InputItemModel.js';
import InputItemValidator from '../model/InputItemValidator.js';
import Vue from 'vue';

export default {
  name: 'Screen001',
  
  data: function() {
    
    let form = new FormModel();
    form.editMode = true;
    form.addItem(new InputItemModel(
        {name: "username", label: "screens.screen001.username", 
          mandatory: true, 
          type: "text", size: 100
        }));
   
    let pwdFormatVldtr = new InputItemValidator(function(inputItem, value) {
      if (value == null) {
        value = "";
      }
      var alphaRe = /[a-zA-Z]/g;
      var numberRe = /[0-9]/g;
      if (!(alphaRe.test(value) && numberRe.test(value))) {
        return {"validator.invalidpwdformat": true };
      }
      return null;
    });
    
    form.addItem(new InputItemModel( 
        {name: "pwd", label: "screens.screen001.pwd", 
          mandatory: true, 
          type: "password", 
          size: 100,
          placeholder: "screens.screen001.pwd.placeholder"}
        )).addValidator(pwdFormatVldtr);
    
    form.addItem(new InputItemModel( 
        {name: "fname", label: "screens.screen001.fname", 
         mandatory: true, type: "text",
         size: 100
        }));
    
    form.addItem(new InputItemModel( 
        {name: "lname", label: "screens.screen001.lname", 
          mandatory: true, type: "text",
          size: 100
         }));
    
    form.addItem(new InputItemModel( 
        {name: "gender", label: "screens.screen001.gender", 
         mandatory: true, type: "radio", 
         lookup: new Map([["m", "screens.screen001.gender.lookup.male"],["f", "screens.screen001.gender.lookup.female"]]),
        }));
    
    form.addItem(new InputItemModel( 
        {name: "bday", label: "screens.screen001.bday", 
         mandatory: true, type: "text", 
         format: "yyyy/mm/dd", 
         placeholder: "screens.screen001.bday.placeholder"}));

    return {
      profForm: form,
      errors: []
    };
  },
  
  computed: {
    profileName: function() {
      /*if (this.isNotEmpty(this.profForm.items.fname.value) && 
          this.isNotEmpty(this.profForm.items.lname.value)) {
        return this.profForm.items.fname.value + " " + this.profForm.items.lname.value;
      } else if (this.isNotEmpty(this.profForm.items.fname.value)) {
        return this.profForm.items.fname.value;
      } else if (this.isNotEmpty(this.profForm.items.lname.value)) {
        return this.profForm.items.lname.value;
      }*/
      
      return null;
    }
  },
  
  methods: {
    isNotEmpty: function(value) {
      return value != null && value != "";
    },
    
    doCancel: function(formModel) {
      this.errors = [];
      
      
      //formModel.setReadonly(true);
      formModel.editMode = false;
    },
    
    doSave: function(formModel) {
      this.errors = formModel.validate();
      console.log(JSON.stringify(this.errors));
      console.log('save clicked');
    },
    
    doEdit: function(formModel) {
      this.errors = [];
      formModel.setReadonly(false);
      formModel.editMode = true;
    }
  },
  
  components: {
    'header-tag': HeaderTag,
    'error-tag': ErrorTag,
    'panel-tag': PanelTag,
    'input-tag': InputTag,
    'form-tag': FormTag,
    'label-tag': LabelTag,
    'radio-grp-tag': RadioGrpTag,
    'btn-tag': BtnTag
  }
}
</script>


<style>
  .width_80 {
    width: 80%;
  }
</style>
