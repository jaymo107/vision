import Backbone from 'backbone';
import Marionette from 'backbone.marionette';
import Programme from '../models/Programme';
/**
 * Get any results from the current search criteria
 */
export default Backbone.Collection.extend({
    url: 'http://visionapp.dev/recommendations/1',

    /** @type {Backbone.Model} The Model for the Programme structure */
    model: Programme,

    initialize: function() {
        this.fetch({
            success: this.fetchSuccess,
            error: this.fetchError
        });
    },

    parse: function(response){
        return response.data;
    },

    /**
     * When the programmes have been successfully fetched from
     * the vision server.
     */
    fetchSuccess: function(data) {
        console.log('Recommendations data:');
        console.log(data);
    },

    /**
     * When the programmes have failed to be fetched from
     * the vision server.
     */
    fetchError: function(data) {
        console.log("Couldn't fetch the Recommendations data from our server.");
    }

});
