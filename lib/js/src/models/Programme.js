import Backbone from 'backbone';
/**
 * The Model for a programme.
 */
export default Backbone.Model.extend({
	defaults: {
		programme_id: "",
		image_url: "",
		programme_name: "",
		start: new Date(),
		end: new Date(),
		language: "English",
		synopsis: "",
		synopsis_hash: "",
		last_update: new Date(),
		is_new_entry: "1",
		channel_id: "",
		programme_hash: "",
		category: "",
		item_crid: "",
		series_crid: "",
		channel_name: "",
		radio_flag: "0",
		record_flag: "0",
		user_record_flag: "0",
		wowza_code: "",
		duration: "0",
		progress: "0",
		channel_image: "",
		image: "",
		views: 0,
		genre: 'Unknown'
	}
});