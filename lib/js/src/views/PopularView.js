import Marionette from 'backbone.marionette';
import _ from 'underscore';
import Trending from '../collections/TrendingCollection';
import imdb from 'imdb-api';

/**
 * Recommended view
 */
export default Marionette.View.extend({
	template: _.template(require('./templates/popular.template.html')),

	collection: new Trending(),

	collectionEvents: {
		sync: 'actOnSync'
	},

	actOnSync: function(collection) {
		console.log('Collection was synchronised with the server');

		// this.collection.each(function(programme){
		//
		// 	$.ajax({
		// 		url: "http://imdb.wemakesites.net/api/search?q="+encodeURIComponent(programme.attributes.programme_name),
		// 		method: "GET",
		// 		crossDomain: true,
		// 		dataType: "jsonp",
		// 		success: function(data) {
		// 			console.log(data);
		// 		}
		// 	});
		// });

		this.render();
	}
});