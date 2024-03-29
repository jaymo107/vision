import Marionette from 'backbone.marionette';
import _ from 'underscore';
import Categories from '../collections/CategoryCollection';

/**
 * Recommended view
 */
export default Marionette.View.extend({

	template: _.template(require('./templates/browse.template.html')),

	collection: new Categories(),

	collectionEvents: {
		sync: 'actOnSync'
	},

	/**
	 * Re-render when collection syncs with the server.
	 * @param collection
	 */
	actOnSync: function (collection) {
		this.render();
	}
});