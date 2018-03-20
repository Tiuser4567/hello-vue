import InputItemValidator from './InputItemValidator.js';
import moment from 'moment';

var validators = function() {};

export default validators;

validators.REQUIRED = new InputItemValidator(function(inputItem, value) {
  if (inputItem.mandatory) {
    if (value == "" || value == null) {
      return {"error.required": true};
    }
  }
  return null;
});

validators.MIN_LENGTH = new InputItemValidator(function(inputItem, value) {
  if (inputItem.minlength) {
    if (value == null) {
      value = "";
    }
    if (value.length < inputItem.minlength) {
      return {"error.minlength": [inputItem.minlength, value.length]
      };
    }
  }

  return null;
});

validators.MAX_LENGTH = new InputItemValidator(function(inputItem, value) {
  if (inputItem.maxlength) {
    if (value == null) {
      value = "";
    }
    if (value.length > inputItem.maxlength) {
      return { "error.maxlength": [ inputItem.maxlength, value.length ] };
    }
  }

  return null;
});

validators.DATE_FORMAT = new InputItemValidator(function(inputItem, value) {
  if (value == "" || value == null) {
    return null;
  }
  
  let format = "YYYY/MM/DD";
  if (inputItem.format != null) {
    format = inputItem.format;
  }
  
  if(!moment(value, format, true).isValid()) {
    return { "error.dateformat": [ format.toLowerCase() ] };
  }

  return null;
});

validators.NUMBER_FORMAT = new InputItemValidator(function(inputItem, value) {
  if (value == "" || value == null) {
    return null;
  }
  
  var notNumberRe = /[^0-9]/g;
  if (notNumberRe.test(value)) {
    return {"error.invalidnumberformat": true };
  }

  return null;
});