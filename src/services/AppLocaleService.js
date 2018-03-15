export default {
  
  language : "en",
  languages: ["en", "tl"],

  getLanguage: function() {
    return this.language;
  },

  setLanguage: function(language) {
    this.language = language;
  },
  
  setLanguages: function(languages) {
    this.languages = languages;
  },
  
  getLanguages: function() {
    return this.languages;
  }

};