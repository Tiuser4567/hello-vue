export default {
  
  _getLabel: function(locale, key) {
    if (this.LABELS[locale]) {
      if (this.LABELS[locale][key] != null) {
        return this.LABELS[locale][key];
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
  
  getLabel: function(locale, key) {
    return this._getFormattedLabel.apply(this, arguments);
  },
  
  format : function(str) {
    var args = Array.prototype.slice.call(arguments, 1);
    return str.replace(/\{(\d+)\}/g, function(match, number) {
      return typeof args[number] != 'undefined' && args[number] != null? args[number]: "";
    });
  },
  
  LABELS: {
    "en": {
      "services.applocale.lang.en": "English",
      "services.applocale.lang.tl": "Tagalog",
      "components.gui.langctrl.label": "Language",
      
      "screens.screen001.title": "User",
      "screens.screen001.profile.nouser": "User Profile",
      "screens.screen001.profile.hasuser": "{0}'s Profile",
      "screens.screen001.otherdetails": "Other Details" 
    },
    
    "tl": {
      "services.applocale.lang.en": "Ingles",
      "services.applocale.lang.tl": "Tagalog",
      "components.gui.langctrl.label": "Lenggwahe",
      
      "screens.screen001.title": "Taga-gamit",
      "screens.screen001.profile.nouser": "Profile ng Taga-gamit",
      "screens.screen001.profile.hasuser": "Profile ni {0}",
      "screens.screen001.otherdetails": "Ibang Detalye" 
    }
  }

};