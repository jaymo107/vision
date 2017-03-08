/**
 * Created by JamesDavies on 29/11/2016.
 */
import Marionette from 'backbone.marionette';
import _ from 'underscore';
import RecentlyWatched from '../collections/RecentlyWatched';

/**
 * Recently Watched view
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


	onDomRefresh: function(){
		$('.recently-watched-carousel').slick({
			slidesToShow: 4,
			lazyLoad: 'ondemand',
			infinite: true,
			slidesToScroll: 1,
			autoplay: true,
			arrows: false,
			autoplaySpeed: 2000
		});
	},

	templateContext: function(){
		return {
			carouselId: 'recently-watched-carousel'
		};
	}
});