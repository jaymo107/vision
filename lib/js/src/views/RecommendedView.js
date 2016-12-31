/**
 * Created by JamesDavies on 29/11/2016.
 */
import Marionette from 'backbone.marionette';
import _ from 'underscore';
import Recommendations from '../collections/Recommendations';

/**
 * Recommended view
 */
export default Marionette.View.extend({
    template: _.template(require('./templates/carousel.template.html')),

    collection: new Recommendations(),

    collectionEvents: {
        sync: 'actOnSync'
    },

    actOnSync: function(collection) {
        this.render();
    },

    /**
     * Create the carousel for the new programmes.
     */
    onDomRefresh: function() {
        $('.recommended-carousel').slick({
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
            carouselId: 'recommended-carousel'
        };
    }
});
