import Vue from 'vue';
export default function FormModel () {
  this.items = {};
  this.formValidators = [];
  this.editMode = false;
}

FormModel.prototype.addItem = function(item) {
  Vue.set(this.items, item.name, item);
  return item;
};

FormModel.prototype.setAllItemOptions = function(opt) {
  for (let name in this.items) {
    this.setItemOptions(name, opt);
  }
}

FormModel.prototype.setItemOptions = function(name, opt) {
  this.items[name] = this.items[name].clone(opt);
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

FormModel.prototype.save = function() {
  let data = {};
  for (let name in this.items) {
    data[name] = this.items[name].value; 
  }
  return data;
}

FormModel.prototype.restore = function(data) {
  for (let name in this.items) {
    this.setItemOptions(name, {value : data[name]});
  }
}