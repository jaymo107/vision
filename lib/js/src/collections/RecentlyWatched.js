import Backbone from 'backbone';
import Marionette from 'backbone.marionette';
import Programme from '../models/Programme';
/**
 * Get the recently watched programming
 */
export default Backbone.Collection.extend({
	url: 'http://iptv-stats-lb-float.lancs.ac.uk:9110/analysis/viewing_history_v2?image_size=210x150&tv_radio=TV&limit=10&timestamp=1480173113.441&api=53e659a15aff4a402de2d51b98703fa1ade5b8c5&user_id=2380',
	
	/** @type {Backbone.Model} The Model for the Programme structure */
	model: Programme,

	initialize: function() {
		this.fetch({
			success: this.fetchSuccess,
			error: this.fetchError
		});
	},

	parse: function(response){
		return response.data[0];
	},


	/**
	 * When the programmes have been successfully fetched from
	 * the vision server.
	 */
	fetchSuccess: function(data) {
		console.log('History data:');
		console.log(data);
	},

	/**
	 * When the programmes have failed to be fetched from
	 * the vision server.
	 */
	fetchError: function(data) {
		console.log("Couldn't fetch the treding data from the server.");
	}

});