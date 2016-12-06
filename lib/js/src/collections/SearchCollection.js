import Backbone from 'backbone';
import Marionette from 'backbone.marionette';
import Programme from '../models/Programme';
/**
 * Get any results from the current search criteria
 */
export default Backbone.Collection.extend({
	url: 'http://iptv-svc-search.lancs.ac.uk/search2.php?',
	
	/** @type {Backbone.Model} The Model for the Programme structure */
	model: Programme,

	initialize: function(options) {

		let query = options.search;

		// Build the search url
		this.url = this.url + 'q='+ query +'&start=0&rows=20&url=%2Ffuture%2Fselect&wt=json&send_filters=false&user_id=4&api=53e659a15aff4a402de2d51b98703fa1ade5b8c5&sort=score%2Bdesc&fq=start%3A%5BNOW-100YEAR+TO+NOW%5D';
	},

	parse: function(response){
		return response.response.docs;
	}

});