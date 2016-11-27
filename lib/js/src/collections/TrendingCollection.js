import Backbone from 'backbone';
import Marionette from 'backbone.marionette';
import Programme from '../models/Programme';
import _ from 'underscore';
/**
 * Get the current trending programmes on the Vision platform.
 */
export default Backbone.Collection.extend({
	url: 'http://iptv-svc-node-slave.lancs.ac.uk:2000/trending',

	/** @type {Backbone.Model} The Model for the Programme structure */
	model: Programme,

	initialize: function () {
		this.fetch({
			success: this.fetchSuccess,
			error: this.fetchError
		});
	},

	/**
	 * Parse the response and only add the programmes which are
	 * on-demand to the collection by searching for the key
	 * vod_status
	 * @param response
	 * @returns {Array}
	 */
	parse: function (response) {
		let programmes = [];

		_.each(response, (element) => {
			if (_.has(element, 'vod_status')) {
				programmes.push(element);
			}
		});
		return programmes;
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
		console.log("Couldn't fetch the treding data from the server.");
	}

});