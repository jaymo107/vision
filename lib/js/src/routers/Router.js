import _ from 'underscore';
import Marionette from 'backbone.marionette';
import AppLayoutView from '../views/AppLayoutView';
import HomeView from '../views/HomeView';
import BrowseView from '../views/BrowseView';
import PopularView from '../views/PopularView';
import WatchView from '../views/WatchView';
import ShowsView from '../views/ShowsView';
/**
 * Router
 */
export default Marionette.AppRouter.extend({

	routes: {
		'browse': 'browseRoute',
		'browse/:genre': 'browseShows',
		'popular': 'popularRoute',
		'watch': 'watchRoute',
		'watch/:id': 'watchRoute',
		'*actions': 'defaultRoute'
	},

	defaultRoute: function () {
		new AppLayoutView()
			.showChildView('body', new HomeView());
		SpatialNavigation.focus('#nav-home');
	},

	browseRoute: function () {
		new AppLayoutView()
			.showChildView('body', new BrowseView());
		SpatialNavigation.focus('#nav-browse');
	},

	popularRoute: function () {
		new AppLayoutView()
			.showChildView('body', new PopularView());
		SpatialNavigation.focus('#nav-popular');
	},

	watchRoute: function (id) {
		new AppLayoutView()
			.showChildView('body', new WatchView({
				id: id
			}));
	},

	browseShows: function (genre) {
		new AppLayoutView()
			.showChildView('body', new ShowsView({
				genre: genre
			}));
	},

	initialize: function (options) {
		_.extend(this, options);
	}

});
