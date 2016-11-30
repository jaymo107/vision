import Marionette from 'backbone.marionette';
import _ from 'underscore';
import HeaderView from './HeaderView';
import NavigationView from './NavigationView';
import $ from 'jquery';
import videojs from 'video.js';
/**
 * Main LayoutView for the app
 */
export default Marionette.View.extend({
    el: '.container',

    template: _.template(require('./templates/app.template.html')),

    regions: {
        header: {
            el: 'header'
        },
        navigation: {
            el: 'nav'
        },
        body: {
            el: '.body'
        }
    },

    initialize: function (options) {
        _.extend(this, options);
        this.render();
    },

    onShow: function(){
        _.each(this.children, function(childView){

            if (childView.onShow){
                childView.onShow();
            }
            
        });
    },

    /**
     * Render the child views.
     */
    onRender: function () {
        this.showChildView('header', new HeaderView());
        this.showChildView('navigation', new NavigationView());
    }

});