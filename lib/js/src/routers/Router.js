import _ from 'underscore';
import Marionette from 'backbone.marionette';
import AppLayoutView from '../views/AppLayoutView';
import HomeView from '../views/HomeView';
import BrowseView from '../views/BrowseView';
import PopularView from '../views/PopularView';
import WatchView from '../views/WatchView';
import ShowsView from '../views/ShowsView';
import ConnectView from '../views/ConnectView';
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
		'connect': 'connectRoute',
		'*actions': 'defaultRoute'
	},

	connectRoute: function() {
		// Route to login and connect your vision account to your TV
		console.log('Show the login view');
		new ConnectView();
		SpatialNavigation.focus('#connect-input');
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
