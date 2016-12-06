import Marionette from 'backbone.marionette';
import _ from 'underscore';

/**
 * Header view
 */
export default Marionette.View.extend({

    triggers: {
		'keyup #search-box': 'search',
		'focus #search-box': 'renderSearch'
    },

    template: _.template(require('./templates/header.template.html')),

    search: function() {
    	this.triggerMethod('search');
  	},

  	renderSearch: function() {
  		this.triggerMethod('renderSearch');
  	}
}); 