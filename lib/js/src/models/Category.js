/**
 * Created by JamesDavies on 18/11/2016.
 */
import Backbone from 'backbone';
import Marionette from 'backbone.marionette';

export default Backbone.Model.extend({
	defaults: {
		channel_name: '',
		programme_name: '',
		title: '',
		total: 0
	}
});