import InputItemValidator from './InputItemValidator.js';

var validators = function() {};

export default validators;

validators.REQUIRED = new InputItemValidator(function(inputItem, value) {
  if (inputItem.mandatory) {
    if (value == "" || value == null) {
      return {"validator.required": true};
    }
  }
  return null;
});

validators.MIN_LENGTH = new InputItemValidator(function(inputItem, value) {
  if (inputItem.minLength) {
    if (value == null) {
      value = "";
    }
    if (value.length < inputItem.minLength) {
      return {"validator.minlength": [inputItem.minLength, value.length]
      };
    }
  }

  return null;
});

validators.MAX_LENGTH = new InputItemValidator(function(inputItem, value) {
  if (inputItem.maxLength) {
    if (value == null) {
      value = "";
    }
    if (value.length > inputItem.maxLength) {
      return { "validator.maxlength": [ inputItem.maxLength, value.length ] };
    }
  }

  return null;
});