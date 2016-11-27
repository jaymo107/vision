import Marionette from 'backbone.marionette';
import _ from 'underscore';
import Video from '../models/Video';

/**
 * Watch view
 */
export default Marionette.View.extend({
	template: _.template(require('./templates/watch.template.html')),

	model: Video,

	modelEvents: {
		'change': 'render'
	},

	initialize: function(options) {
		console.log(options.id);

		this.model = new Video({
			id: options.id
		});

		this.model.fetch({
			success: (data) => {
				console.log(data);
			}
 		});
	},

	serializeData: function(){
		let data = this.model.toJSON();
		console.log(data);
		return {
			name: data.name,
			synopsis: data.synopsis,
			id: data.id
		};
	}}
);