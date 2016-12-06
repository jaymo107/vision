import Marionette from 'backbone.marionette';
import _ from 'underscore';
import SearchCollection from '../collections/SearchCollection';

/**
 * Search results view view
 */
export default Marionette.View.extend({

	template: _.template(require('./templates/results.template.html')),

	collectionEvents: {
		sync: 'actOnSync'
	},

	initialize: function (options) {
		this.collection = new SearchCollection({search: options.search});
		this.search = options.search;

		this.collection.fetch({
			success: this.fetchSuccess,
			error: this.fetchError
		});
	},

	templateContext: function(){
		return {
			search: this.getOption('search'),
			items: this.collection.models
		};
	},

	/**
	 * When the programmes have been successfully fetched from
	 * the vision server.
	 */
	fetchSuccess: function(data) {
		console.log('Search data:');
		console.log(data);
	},

	/**
	 * When the programmes have failed to be fetched from
	 * the vision server.
	 */
	fetchError: function(data) {
		console.log("Error retrieving search terms.");
	},


	/**
	 * Re-render when collection syncs with the server.
	 * @param collection
	 */
	actOnSync: function (collection) {
		this.render();
	}
});