import EN_LABELS from '../props/labels_en.js'
import TL_LABELS from '../props/labels_tl.js'

export default {
  _getLabelProps: function(locale) {
    if (locale == 'tl'){
      return TL_LABELS;
    }
    return EN_LABELS;
  },
  
  _getLabel: function(locale, key) {
    if (this._getLabelProps(locale)) {
      if (this._getLabelProps(locale)[key] != null) {
        return this._getLabelProps(locale)[key];
      }
    }
    return null;
  },
  
  _getFormattedLabel: function(locale, key) {
    var label = this._getLabel(locale, key);
    if (label != null) {
      var args = Array.prototype.slice.call(arguments, 2);
      args.unshift(label);
      return this.format.apply(this, args);
    }
    
    return key;
  },
  
  getLabel: function(/* locale, key */) {
    return this._getFormattedLabel.apply(this, arguments);
  },
  
  format : function(str) {
    var args = Array.prototype.slice.call(arguments, 1);
    return str.replace(/\{(\d+)\}/g, function(match, number) {
      return typeof args[number] != 'undefined' && args[number] != null? args[number]: "";
    });
  }
};