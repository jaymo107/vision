import Backbone from 'backbone';
/**
 * The currently logged in user.
 */
export default Backbone.Model.extend({
	defaults: {
		status: 0,
		id: 0,
		token: '',
		username: ''
	},

	/**
	 * Check if the user is logged in.
	 */
	isLoggedIn: function() {
		return !!(this.get('status') == 1);
	}
});