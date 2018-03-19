export default function InputItemValidator(validateFunc) {
   this.validateFunc = validateFunc;
}

InputItemValidator.prototype.validate = function(inputItem, value) {
  return this.validateFunc(inputItem, value);
}