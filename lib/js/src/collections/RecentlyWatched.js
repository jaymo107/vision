import Backbone from 'backbone';
import Marionette from 'backbone.marionette';
import Programme from '../models/Programme';
/**
 * Get the recently watched programming
 */
export default Backbone.Collection.extend({
    url: "/history/" + localStorage.getItem("user_id"),

    /** @type {Backbone.Model} The Model for the Programme structure */
    model: Programme,

    initialize: function () {
        this.fetch({
            success: this.fetchSuccess,
            error: this.fetchError
        });
    },

    parse: function (response) {
        return response.data;
    },


    /**
     * When the programmes have been successfully fetched from
     * the vision server.
     */
    fetchSuccess: function (data) {
        
    },

    /**
     * When the programmes have failed to be fetched from
     * the vision server.
     */
    fetchError: function (data) {
       
    }

});