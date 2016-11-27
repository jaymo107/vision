import Backbone from 'backbone';
/**
 * Model for the navigation to differentiate between
 * each of the pages and highlight the correct link.
 */
export default Backbone.Model.extend({
	defaults: {
    	page: ""
  	}
});