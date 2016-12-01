import Marionette from 'backbone.marionette';
import _ from 'underscore';
import VODCollection from '../collections/BrowseVODCollection';

/**
 * Recommended view
 */
export default Marionette.View.extend({

	template: _.template(require('./templates/shows.template.html')),

	genre: '',

	collectionEvents: {
		sync: 'actOnSync'
	},

	initialize: function (options) {

		this.collection = new VODCollection({genre: options.genre});

	},

	templateContext: function(){
		return {
			genre: this.getOption('genre')
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