import Backbone from 'backbone';
import Programme from '../models/Programme';
/**
 * Browse the video on demand section
 */
export default Backbone.Collection.extend({
	url: 'http://iptv-svc-search.lancs.ac.uk:8983/solr/browse_vod/select?wt=json',

	genre: '',

	/** @type {Backbone.Model} The Model for the Programme structure */
	model: Programme,

	initialize: function (options) {
		this.genre = options.genre;
		this.url = this.url + '&rows=10&start=1&q=genre:' + options.genre + '&sort=programme_name%20asc';

		this.fetch({
			success: this.fetchSuccess,
			error: this.fetchError
		});
	},

	parse: function (response) {
		return response.docs;
	},


	/**
	 * When the programmes have been successfully fetched from
	 * the vision server.
	 */
	fetchSuccess: function (data) {
		console.log('History data:');
		console.log(data);
	},

	/**
	 * When the programmes have failed to be fetched from
	 * the vision server.
	 */
	fetchError: function (data) {
		console.log("Couldn't fetch the treding data from the server.");
	}

});