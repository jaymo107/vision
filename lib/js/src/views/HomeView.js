import _ from 'underscore';
import Marionette from 'backbone.marionette';
import RecentlyWatchedView from './RecentlyWatchedView';
import RecommendedView from './RecommendedView';

/**
 * Recommended view
 */
export default Marionette.View.extend({
	template: _.template(require('./templates/home.template.html')),

	regions: {
		recommendedRegion: {
			el: '#recommended-region'
		},
		historyRegion: {
			el: '#history-region'
		}
	},

	initialize: function (options) {

	},

	onRender: function() {
		this.showChildView('recommendedRegion', new RecommendedView());
		this.showChildView('historyRegion', new RecentlyWatchedView());
	}
});
