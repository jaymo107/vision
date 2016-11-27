import Backbone from 'backbone';
import Marionette from 'backbone.marionette';
import _ from 'underscore';
import Page from '../models/NavigationPage';
/**
 * Navigation view
 */
export default Marionette.View.extend({
	model: new Page(),

	template: _.template(require('./templates/navigation.template.html')),

	initialize: function() {
		this.model.set('page', Backbone.history.getFragment());	
	}
});