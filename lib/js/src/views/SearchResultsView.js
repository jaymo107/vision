import Marionette from 'backbone.marionette';
import _ from 'underscore';
import SearchCollection from '../collections/SearchCollection';

/**
 * Search results view view
 */
export default Marionette.View.extend({

	template: _.template(require('./templates/results.template.html')),

	events: {
		'click .back': 'backPage',
		'click .next': 'nextPage'
	},

	collectionEvents: {
		sync: 'actOnSync'
	},

	initialize: function (options) {
		this.collection = new SearchCollection({search: options.search});
		this.search = options.search;

		this.page = 0;

		this.recentlyPressed = "";

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

	backPage: function(e){

		e.preventDefault();

		if(this.getOption('page') < 1) return;

		this.page -= 1;

		console.log('Go back a page to page ' + this.getOption('page'));

		this.collection = new SearchCollection({search: this.getOption('search'), page: this.getOption('page')});

		this.collection.fetch({
			success: this.render,
			error: this.fetchError
		});

		this.recentlyPressed = 'back';
	},

	nextPage: function(e) {
		e.preventDefault();
		
		this.page += 1;

		this.collection = new SearchCollection({search: this.getOption('search'), page: this.getOption('page')});

		this.collection.fetch({
			success: this.render,
			error: this.fetchError
		});

		console.log('Go next to page ' + this.getOption('page'));

		this.recentlyPressed = 'next';

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

	onRender: function(){
		if(this.getOption('recentlyPressed') != "") {
			SpatialNavigation.focus('.'+this.getOption('recentlyPressed'));
		}
	},


	/**
	 * Re-render when collection syncs with the server.
	 * @param collection
	 */
	actOnSync: function (collection) {
		this.render();
	}
});