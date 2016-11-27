import Marionette from 'backbone.marionette';
import _ from 'underscore';

/**
 * Header view
 */
export default Marionette.View.extend({
	template: _.template(require('./templates/header.template.html'))
});