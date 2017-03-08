import Marionette from 'backbone.marionette';
import _ from 'underscore';
import VODCollection from '../collections/BrowseVODCollection';

/**
 * Recommended view
 */
export default Marionette.View.extend({

	template: _.template(require('./templates/shows.template.html')),

	genre: '',

	events: {
		'click .back': 'backPage',
		'click .next': 'nextPage'
	},

	collectionEvents: {
		sync: 'actOnSync'
	},

	initialize: function (options) {

		this.page = 0;

		this.collection = new VODCollection({genre: options.genre, page: this.getOption('page')});

	},

	templateContext: function(){
		return {
			genre: this.getOption('genre'),
			items: this.collection.models
		};
	},

	backPage: function(e){

		e.preventDefault();

		if(this.getOption('page') < 1) return;

		this.page -= 1;

		

		this.collection = new VODCollection({genre: this.getOption('genre'), page: this.getOption('page')});

		this.collection.fetch({
			success: this.render,
			error: this.fetchError
		});

		this.recentlyPressed = 'back';

	},

	nextPage: function(e) {
		e.preventDefault();
		
		this.page += 1;

		this.collection = new VODCollection({genre: this.getOption('genre'), page: this.getOption('page')});

		this.collection.fetch({
			success: this.render,
			error: this.fetchError
		});

		

		this.recentlyPressed = 'next';

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