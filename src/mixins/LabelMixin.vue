<script>
import AppLocaleService from '../services/AppLocaleService.js';
import LabelService from '../services/LabelService.js';

export default {
  methods: {
    getLabel: function(key) {
        var args = Array.prototype.slice.call(arguments, 0);
        args.unshift(AppLocaleService.getLanguage());
        return LabelService.getLabel.apply(LabelService, args);
    }
  }
}
</script>