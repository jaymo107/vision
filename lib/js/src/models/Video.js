/**
 * Created by JamesDavies on 23/11/2016.
 */
import Backbone from 'backbone';
import $ from 'jquery';

export default Backbone.Model.extend({
    defaults: {
        id: null,
        isPlaying: false,
        elapsedTime: 0,
        name: '',
        synopsis: '',
        channel_name: '',
        image: '',
        programme_name: ''
    },

    parse: function (response) {

        let data = response.data[0];

        return {
            name: data.p_name,
            synopsis: data.p_synopsis,
            channel_name: data.channel_name,
            image: data.image
        };
    },

    initialize: function (options) {
        console.log(options);
        this.id = options.id;
        console.log("ID SET to: " + this.id);
        this.url = 'http://vision.lancs.ac.uk:9110/modules/videometa/get_video_meta?programme_id=' + this.id + '&timestamp=1479981412.276&api=53e659a15aff4a402de2d51b98703fa1ade5b8c5&';

    }
});