import Backbone from 'backbone';
import Programme from '../models/Programme';
/**
 * Browse the video on demand section
 */
export default Backbone.Collection.extend({
	url: 'http://iptv-svc-search.lancs.ac.uk/search2.php?',

	genre: '',

	/** @type {Backbone.Model} The Model for the Programme structure */
	model: Programme,

	initialize: function (options) {
		this.genre = options.genre;
		this.page = (options.page) ? options.page : 0;
		this.url = this.url + 'q=*&start=' + (options.page * 64) + '&rows=64&url=%2Ffuture%2Fselect&wt=json&send_filters=false&user_id=4&api=53e659a15aff4a402de2d51b98703fa1ade5b8c5&sort=score%2Bdesc&fq=start%3A%5BNOW-100YEAR+TO+NOW%5D+AND+genre%3A"'+ options.genre +'"';

		this.fetch({
			success: this.fetchSuccess,
			error: this.fetchError
		});
	},

	parse: function (response) {
		return response.response.docs;
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