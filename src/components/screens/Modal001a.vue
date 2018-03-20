<template>
  <div class="modal001a">
    <error-tag v-bind:errors="errors"></error-tag>
    <form-tag>
      <div class="form-label">
          <label-tag v-model="form.items.label"></label-tag>
        </div>
        <div class="form-input">
          <input-tag class="width_80" v-model="form.items.label"></input-tag>
      </div>
      <div class="form-label">
          <label-tag v-model="form.items.type"></label-tag>
        </div>
        <div class="form-input">
          <radio-grp-tag v-bind:inline="true" v-model="form.items.type"></radio-grp-tag>
      </div>
      <div class="form-label">
          <label-tag v-model="form.items.mandatory"></label-tag>
        </div>
        <div class="form-input">
          <radio-grp-tag v-bind:inline="true" v-model="form.items.mandatory"></radio-grp-tag>
      </div>
      <div class="form-label">
          <label-tag v-model="form.items.minlength"></label-tag>
        </div>
        <div class="form-input">
          <input-tag class="width_80" v-model="form.items.minlength"></input-tag>
      </div>
      <div class="form-label">
          <label-tag v-model="form.items.maxlength"></label-tag>
        </div>
        <div class="form-input">
          <input-tag class="width_80" v-model="form.items.maxlength"></input-tag>
      </div>
      <div class="form-label">
          <label-tag v-model="form.items.placeholder"></label-tag>
        </div>
        <div class="form-input">
          <input-tag class="width_80" v-model="form.items.placeholder"></input-tag>
      </div>
      <div class="form-label">
          <label-tag v-model="form.items.options"></label-tag>
        </div>
        <div class="form-input">
          <textarea-tag class="width_80" v-model="form.items.options"></textarea-tag>
      </div>
    </form-tag>
    <div class="buttons">
      <btn-tag v-on:click="doClose" label="btn.cancel"></btn-tag>
      <btn-tag highlight="true" v-on:click="doAdd" label="btn.add"></btn-tag>
    </div>
  </div>
</template>

<script>
import InputTag from '../gui/form/InputTag.vue';
import FormTag from '../gui/form/FormTag.vue';
import LabelTag from '../gui/form/LabelTag.vue';
import FormModel from '../model/FormModel.js';
import InputItemModel from '../model/InputItemModel.js';
import InputItemValidators from '../model/InputItemValidators.js';
import RadioGrpTag from '../gui/form/RadioGrpTag.vue';
import BtnTag from '../gui/form/BtnTag.vue';
import TextAreaTag from '../gui/form/TextAreaTag.vue';
import ErrorTag from '../gui/ErrorTag.vue';

export default {
  name: 'Modal001a',
  props: {
    msg: String
  },
  data:  function() {
    
    let form = new FormModel();
    form.editMode = true;

    form.addItem(new InputItemModel( 
        {name: "label", label: "modal.modal001a.label", 
          mandatory: true,
          type: "text", size: 100}
        ));
    
    form.addItem(new InputItemModel( 
        {name: "type", label: "modal.modal001a.type", 
          mandatory: true,
          type: "radio",
          lookup: new Map([
            ["t", "modal.modal001a.type.lookup.t"], 
            ["r", "modal.modal001a.type.lookup.r"], 
            ["d", "modal.modal001a.type.lookup.d"]
          ])
        }
        ));
    
    form.addItem(new InputItemModel( 
        {name: "mandatory", label: "modal.modal001a.mandatory", 
          mandatory: true,
          type: "radio",
          lookup: new Map([
            ["y", "modal.modal001a.mandatory.lookup.y"], 
            ["n", "modal.modal001a.mandatory.lookup.n"]
          ])
        }
        ));
    
    form.addItem(new InputItemModel( 
        {name: "minlength", label: "modal.modal001a.minlength", 
          type: "text",
          size: 100
        }
        )).addValidator(InputItemValidators.NUMBER_FORMAT);
    
    form.addItem(new InputItemModel( 
        {name: "maxlength", label: "modal.modal001a.maxlength", 
          type: "text",
          size: 100
        }
        )).addValidator(InputItemValidators.NUMBER_FORMAT);
    
    form.addItem(new InputItemModel( 
        {name: "placeholder", label: "modal.modal001a.placeholder", 
          type: "text",
          size: 100
        }
        ));
    
    form.addItem(new InputItemModel( 
        {name: "options", label: "modal.modal001a.options", 
          type: "text",
          placeholder: "modal.modal001a.options.placeholder"
        }
        ));
    
    return {
      form: form,
      title: "modal.modal001a.title",
      errors: []
    };
  },
  watch: {
    'form.items.type': function(typeField) {
       this.form.setItemOptions('options', {mandatory: typeField.value == 'r'});
    }
  },
  created: function() {
    this.$emit('modalCreate', {title: this.title});
  },
  methods: {
    doClose: function() {
      this.$emit('modalClose');
    },
    doAdd: function() {
      this.errors = this.form.validate();
      console.log(this.form.items.options.value);
      if (this.errors.length == 0) {
        let item = {};
        
        
        let label =  this.form.items.label.value;
        if (label != null && label != "") {
          item.label = label;
        }
        
        item.name = "f_" + new Date().getTime();
        
        let type = this.form.items.type.value;
        
        if (type == 'r') {
          item.type = "radio";
        } else if (type == 'd') {
          item.type = "text";
          item.format = "YYYY/MM/DD";
        } else {
          item.type = "text";
        }
        
        let mandatory = this.form.items.mandatory.value;
        if (mandatory == 'y') {
          item.mandatory = true;
        }
          
        let minlength = this.form.items.minlength.value;
        let maxlength = this.form.items.maxlength.value;
        let placeholder = this.form.items.placeholder.value;
        
        if (minlength != null && minlength != "") {
          item.minlength = minlength;
        }
        if (maxlength != null && maxlength != "") {
          item.maxlength = maxlength;
        } 
        if (placeholder != null && placeholder != "") {
          item.placeholder = placeholder;
        } 
        
        let options = this.form.items.options.value;
        if (options != null && options != "") {
          var lookup = [];
          var res = options.split("\n");
          for (let i = 0, size = res.length; i < size; i++) {
            let opt = res[i];
            let trimmed = opt != null? opt.trim(): null;
            if (trimmed != null && trimmed != "") {
              lookup.push([trimmed, trimmed]);
            }
          }
          if (lookup.length > 0) {
            item.lookup = new Map(lookup);
          }
        } 
        
        let itemModel = new InputItemModel(item);
        if (type == 'd') {
          itemModel.addValidator(InputItemValidators.DATE_FORMAT);
        }
        
        this.$emit('modalUpdate', {item: itemModel});
        this.$emit('modalClose');
      }
    },
  },
  components: {
    'error-tag': ErrorTag,
    'input-tag': InputTag,
    'form-tag': FormTag,
    'label-tag': LabelTag,
    'radio-grp-tag': RadioGrpTag,
    'btn-tag': BtnTag,
    'textarea-tag': TextAreaTag
  }
}
</script>


<style >
  .modal001a {
    padding: 5px;
  }
  .modal001a .buttons {
    text-align: right;
    margin-right: 10px;
  }
  .modal001a form {
    margin-top: 0.5em;
  }
</style>
