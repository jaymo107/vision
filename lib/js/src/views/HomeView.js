import Marionette from 'backbone.marionette';
import _ from 'underscore';

/**
 * Recommended view
 */
export default Marionette.View.extend({
    template: _.template(require('./templates/home.template.html'))
});
