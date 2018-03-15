<script>
import AppLocaleService from '../services/AppLocaleService.js';
import LabelService from '../services/LabelService.js';

export default {
  methods: {
    getLabel: function(key) {
        var args = Array.prototype.slice.call(arguments, 2);
        args.unshift(AppLocaleService.getLanguage(), key);
        return LabelService.getLabel.apply(LabelService, args);
    }
  }
}
</script>