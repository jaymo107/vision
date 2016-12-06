import Marionette from 'backbone.marionette';
import _ from 'underscore';
import VODCollection from '../collections/BrowseVODCollection';

/**
 * Search results view view
 */
export default Marionette.View.extend({

	template: _.template(require('./templates/results.template.html')),

	collectionEvents: {
		sync: 'actOnSync'
	},

	initialize: function (options) {
		//this.collection = new VODCollection({genre: options.genre});
		console.log(options.search);
		this.search = options.search;
	},

	templateContext: function(){
		return {
			search: this.getOption('search')
		};
	},


	/**
	 * Re-render when collection syncs with the server.
	 * @param collection
	 */
	actOnSync: function (collection) {
		this.render();
	}
});