import Marionette from 'backbone.marionette';
import _ from 'underscore';
import $ from 'jquery';
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
		

		this.splitCollection();

		this.render();
	},

	/**
	 * Reads the collection and splits it to be seperated
	 * into multiple carousels within the view.
	 * 
	 * @return array
	 */
	splitCollection: function() {

		// Stores per carousel
		let collections = [];

		// Stores for 1 carousel
		let currentCollection = [];
		
		_.each(this.collection.models, (model, index) => {

			currentCollection.push(model);

			if(((index % 8) == 0) && index > 0) {

				
				collections.push(currentCollection); 
				currentCollection = [];
			}
		});


		return collections;

	},

	onDomRefresh: function(){
		$('.popular-carousel').slick({
			slidesToShow: 4,
			lazyLoad: 'ondemand',
			infinite: true,
			slidesToScroll: 1,
			autoplay: true,
			arrows: false,
			autoplaySpeed: 2000
		});
	},

	templateContext: function() {
		return {
			total: this.collection.length,
			perCarousel: 12,
			perLine: 4,
			collections: this.splitCollection()
		};
	}
});