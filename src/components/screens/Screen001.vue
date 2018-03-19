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
          <label-tag v-model="profForm.items.username"></label-tag>
        </div>
        <div class="form-input">
          <input-tag class="width_80" v-model="profForm.items.username"></input-tag>
        </div>
        <div class="form-label">
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
          <input-tag class="width_80" v-model="profForm.items.bday"></input-tag>
        </div> 
      </form-tag> 
      <div slot="buttons">
        <btn-tag v-if="profForm.editMode" v-on:click="doCancel('prof')" label="btn.cancel"></btn-tag>
        <btn-tag v-if="profForm.editMode" v-on:click="doSave('prof')" highlight="true" label="btn.save"></btn-tag>
        <btn-tag v-if="!profForm.editMode" v-on:click="doEdit('prof')" label="btn.edit"></btn-tag>
      </div>
    </panel-tag>
    <panel-tag v-bind:title="getLabel('screens.screen001.otherdetails')"
      icon="list-ul"> 
      <form-tag>
          <div v-for="(item, index) of othForm.items" v-bind:key="index">
            <div class="form-label">
              <label-tag v-model="othForm.items[index]"></label-tag>
            </div>
            <div class="form-input">
              <radio-grp-tag v-if="othForm.items[index].type == 'radio'" v-model="othForm.items[index]"></radio-grp-tag>
              <input-tag v-else class="width_80" v-model="othForm.items[index]"></input-tag>
            </div> 
          </div>
      </form-tag>
      <btn-tag highlight="true" v-on:click="doAdd()" label="btn.add"></btn-tag>
      <div slot="buttons">
        <btn-tag v-if="othForm.editMode" v-on:click="doCancel('oth')" label="btn.cancel"></btn-tag>
        <btn-tag v-if="othForm.editMode" v-on:click="doSave('oth')" highlight="true" label="btn.save"></btn-tag>
        <btn-tag v-if="!othForm.editMode" v-on:click="doEdit('oth')" label="btn.edit"></btn-tag>
      </div>
    </panel-tag>
  </div>
  <modal-tag v-bind:modal="modalScreen" v-on:update="doModalUpdate"></modal-tag>
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
import ModalTag from '../gui/ModalTag.vue';
import FormModel from '../model/FormModel.js';
import InputItemModel from '../model/InputItemModel.js';
import InputItemValidator from '../model/InputItemValidator.js';
import InputItemValidators from '../model/InputItemValidators.js';
import Modal001a from '../screens/Modal001a.vue';


export default {
  name: 'Screen001',
  
  data: function() {
    let profData = {}; 
    
    let profForm = new FormModel();
    profForm.editMode = true;
    
    profForm.addItem(new InputItemModel( 
        {name: "username", label: "screens.screen001.username", 
          mandatory: true,
          minlength: 3,
          maxlength: 10,
          type: "text", size: 100}
        ));
   
    let pwdFormatVldtr = new InputItemValidator(function(inputItem, value) {
      if (value == null) {
        value = "";
      }
      var alphaRe = /[a-zA-Z]/g;
      var numberRe = /[0-9]/g;
      if (!(alphaRe.test(value) && numberRe.test(value))) {
        return {"error.invalidpwdformat": true };
      }
      return null;
    });
    
    profForm.addItem(new InputItemModel( 
        {name: "pwd", label: "screens.screen001.pwd", 
          mandatory: true, 
          type: "password", 
          size: 100,
          placeholder: "screens.screen001.pwd.placeholder"}
        )).addValidator(pwdFormatVldtr);
    
    profForm.addItem(new InputItemModel( 
        {name: "fname", label: "screens.screen001.fname", 
         mandatory: true, type: "text",
         size: 100
        }));
    
    profForm.addItem(new InputItemModel( 
        {name: "lname", label: "screens.screen001.lname", 
          mandatory: true, type: "text",
          size: 100
         }));
    
    profForm.addItem(new InputItemModel( 
        {name: "gender", label: "screens.screen001.gender", 
         mandatory: true, type: "radio", 
         lookup: new Map([
                   ["m", "screens.screen001.gender.lookup.male"],
                   ["f", "screens.screen001.gender.lookup.female"]
                 ]),
        }));
    
    profForm.addItem(new InputItemModel( 
        {name: "bday", label: "screens.screen001.bday", 
         type: "text", 
         format: "YYYY/MM/DD", 
         placeholder: "screens.screen001.bday.placeholder"}))
        .addValidator(InputItemValidators.DATE_FORMAT);
    
    var othData = {}; 
    var othForm = new FormModel();
    othForm.editMode = true;
    
    console.log(Modal001a.data());
    
    return {
      profData: profData,
      profForm: profForm,
      othData: othData,
      othForm: othForm,
      errors: [],
      showModal: true,
      modalScreen: Modal001a
    };
  },
  
  computed: {
    profileName: function() {
      if (this.isNotEmpty(this.profForm.items.fname.value) && 
          this.isNotEmpty(this.profForm.items.lname.value)) {
        return this.profForm.items.fname.value + " " + this.profForm.items.lname.value;
      } else if (this.isNotEmpty(this.profForm.items.fname.value)) {
        return this.profForm.items.fname.value;
      } else if (this.isNotEmpty(this.profForm.items.lname.value)) {
        return this.profForm.items.lname.value;
      }
      
      return null;
    }
  },
  
  methods: {
    isNotEmpty: function(value) {
      return value != null && value != "";
    },
    
    doCancel: function(type) {
      this.errors = [];
      let formModel = this[type + "Form"];
      let dbData = this[type + "Data"];
      formModel.restore(dbData);
      formModel.setAllItemOptions({readonly: true});
      formModel.editMode = false;
    },
    
    doSave: function(type) {
      let formModel = this[type + "Form"];
      this.errors = formModel.validate();
      if (this.errors.length == 0) {
        this[type + "Data"] = formModel.save();
        formModel.setAllItemOptions({readonly: true});
        formModel.editMode = false;
      }
    },
    
    doEdit: function(type) {
      this.errors = [];
      let formModel = this[type + "Form"];
      formModel.setAllItemOptions({readonly: false});
      formModel.editMode = true;
    },
    
    doAdd: function() {
      //show modal
    },
    
    doModalUpdate: function(data) {
      if (data) {
        if (data.modalId == "Modal001a" && data.item != null) {
          data.item.readonly = !this.othForm.editMode;
          this.othForm.addItem(new InputItemModel(
              data.item));
        }
      }
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
    'btn-tag': BtnTag,
    'modal-tag': ModalTag
  }
}
</script>


<style>
  .width_80 {
    width: 80%;
  }
</style>
