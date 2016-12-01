import Backbone from 'backbone';
import Marionette from 'backbone.marionette';
import Category from '../models/Category';
/**
 * Categories
 */
export default Backbone.Collection.extend({
	url: 'http://iptv-svc-search.lancs.ac.uk/browse_ondemand.php',

	/** @type {Backbone.Model} The Model for the Programme structure */
	model: Category,

	initialize: function() {
		this.fetch({
			success: this.fetchSuccess,
			error: this.fetchError
		});
	},

	/**
	 * When the programmes have been successfully fetched from
	 * the vision server.
	 */
	fetchSuccess: function(data) {
		console.log('Categories data:');
		console.log(data);
	},

	/**
	 * When the programmes have failed to be fetched from
	 * the vision server.
	 */
	fetchError: function(data) {
		console.log("Couldn't fetch the treding data from the server.");
	}

});