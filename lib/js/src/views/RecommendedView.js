/**
 * Created by JamesDavies on 29/11/2016.
 */
import Marionette from 'backbone.marionette';
import _ from 'underscore';
import RecentlyWatched from '../collections/RecentlyWatched';

/**
 * Recommended view
 */
export default Marionette.View.extend({
	template: _.template(require('./templates/carousel.template.html')),

	collection: new RecentlyWatched(),

	collectionEvents: {
		sync: 'actOnSync'
	},

	actOnSync: function(collection) {
		this.render();
	},

	templateContext: function(){
		return {
			carouselId: 'recommended-carousel'
		};
	}
});