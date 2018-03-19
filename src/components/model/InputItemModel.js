import InputItemValidator from './InputItemValidators.js';

export default function InputItemModel({name, type, mandatory, label, size, value, minLength, maxLength, lookup, format, placeholder, readonly}={}) {
  this.name = name;
  this.type = type;
  this.mandatory = mandatory;
  this.label = label;
  this.size = size;
  this.readonly = readonly;
  this.value = value;
  this.validators = [];
  this.minLength = minLength;
  this.maxLength = maxLength;
  this.lookup = lookup;
  this.format = format;
  this.placeholder = placeholder;
 
  this.addDefaultValidators();
}

InputItemModel.prototype.setReadonly = function(readonly) {
  this.readonly = readonly;
}

InputItemModel.prototype.validate = function() {
  let errors = [];
  for (let validator of this.validators) {
    let result = validator.validate(this, this.value);
    if (result != null) {
      errors.push(result);
    }
  }
  return errors;
}

InputItemModel.prototype.addValidator = function(validator) {
  this.validators.push(validator);
}

InputItemModel.prototype.addDefaultValidators = function() {
  this.addValidator(InputItemValidator.REQUIRED);
  this.addValidator(InputItemValidator.MIN_LENGTH);
  this.addValidator(InputItemValidator.MAX_LENGTH);
}

InputItemModel.prototype.clone = function(opts) {
  let copy = new InputItemModel();
  for (let attr in this) {
      if (this.hasOwnProperty(attr)) copy[attr] = this[attr];
  }
  for (let attr in opts) {
    if (opts.hasOwnProperty(attr)) copy[attr] = opts[attr];
  }
  return copy;
}