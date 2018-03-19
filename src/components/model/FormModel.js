import Vue from 'vue';

export default function FormModel () {
  this.items = {};
  this.formValidators = [];
}

FormModel.prototype.addItem = function(item) {
  Vue.set(this.items, item.name, item);
  return item;
};

FormModel.prototype.setReadonly = function(readonly) {
  for (let name in this.items) {
    this.items[name].readonly = true;
  }
}

FormModel.prototype.addValidator = function(validator) {
  this.formValidators.push(validator);
}

FormModel.prototype.validate = function() {
  let errors = [];
  for (let formValidator of this.formValidators) {
    let results = formValidator.validate(this.items);
    if (results != null) {
      errors.push({
        item: results.item, 
        error: results
      });
    }
  }
  
  for (let name in this.items) {
    let item = this.items[name];
    let results = item.validate();
    if (results != null) {
      for (let res of results) {
        errors.push({
            item: {name: item.name, label: item.label}, 
            error: res
        });  
      }
    }
  }
  return errors;
};