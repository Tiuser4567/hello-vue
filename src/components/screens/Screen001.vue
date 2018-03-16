<template>
<div>
  <header-tag v-bind:title="getLabel('screens.screen001.title')"></header-tag>
  <error-tag></error-tag>
  <div class="content">
    <panel-tag
      v-bind:title="getLabel(profileName? 'screens.screen001.profile.hasuser': 'screens.screen001.profile.nouser', profileName)"
      icon="user"> <form-tag>
    <div>
      <label-tag v-model="username"></label-tag>
    </div>
    <div>
      <input-tag v-model="username"></input-tag>
    </div>
    <div>
      <label-tag v-model="pwd"></label-tag>
    </div>
    <div>
      <input-tag v-model="pwd"></input-tag>
      <input-tag v-model="fname"></input-tag>
      <input-tag v-model="lname"></input-tag>
    </div>
    <div>
      <label-tag v-model="gender"></label-tag>
    </div>
    <div>
      <radio-grp-tag v-model="gender"></radio-grp-tag>
    </div>
    </form-tag> </panel-tag>
    <panel-tag v-bind:title="getLabel('screens.screen001.otherdetails')"
      icon="list-ul"> </panel-tag>
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

export default {
  name: 'Screen001',
  
  data: function() {
    return { 
      username: {name: "username", label: "username", mandatory: true, type: "text"},
      pwd: {name: "pwd", label: "pwd", mandatory: true, type: "password", placeholder: "must contain one letter, one number and one symbol"},
      fname: {name: "fname", label: "fname", mandatory: true, type: "text"},
      lname: {name: "lname", label: "lname", mandatory: true, type: "text"},
      gender: {name: "gender", label: "gender", mandatory: true, type: "radio", lookup: new Map([["m", "Male"],["f", "Female"]])},
      bday: {name: "bday", label: "bday", mandatory: true, type: "text", format: "yyyy/mm/dd", placeholder: "yyyy/mm/dd"},
    };
  },
  
  computed: {
    profileName: function() {
      if (this.fname.value != null && this.fname.value != "" && 
          this.lname.value != null && this.lname.value != "") {
        return this.fname.value + " " + this.lname.value;
      } else if (this.fname.value != null && this.fname.value != "") {
        return this.fname.value;
      } else if (this.lname.value != null && this.lname.value != "") {
        return this.lname.value;
      }
      
      return null;
    }
  },
  
  components: {
    'header-tag': HeaderTag,
    'error-tag': ErrorTag,
    'panel-tag': PanelTag,
    'input-tag': InputTag,
    'form-tag': FormTag,
    'label-tag': LabelTag,
    'radio-grp-tag': RadioGrpTag
  }
}
</script>


<style>
</style>
