import Marionette from 'backbone.marionette';
import AppLayoutView from '../views/AppLayoutView';
import HomeView from '../views/HomeView';
import BrowseView from '../views/BrowseView';
import PopularView from '../views/PopularView';
import WatchView from '../views/WatchView';
import TrendingCollection from '../collections/TrendingCollection';
/**
 * Router
 */
export default Marionette.AppRouter.extend({

	routes: {
		'browse': 'browseRoute',
		'popular': 'popularRoute',
		'watch' : 'watchRoute',
		'watch/:id' : 'watchRoute',
		'*actions': 'defaultRoute'
	},

	defaultRoute: function() {		
		new AppLayoutView()
			.showChildView('body', new HomeView());
		SpatialNavigation.focus('#nav-home');
	},

	browseRoute: function() {
		new AppLayoutView()
			.showChildView('body', new BrowseView());
		SpatialNavigation.focus('#nav-browse');
	},

	popularRoute: function() {
		new AppLayoutView()
			.showChildView('body', new PopularView());
		SpatialNavigation.focus('#nav-popular');
	},

	watchRoute: function(id) {

		new AppLayoutView()
			.showChildView('body', new WatchView({
				id: id
			}));
		SpatialNavigation.focus('video');
	}

});
