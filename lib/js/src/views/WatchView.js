import Marionette from 'backbone.marionette';
import _ from 'underscore';
import Video from '../models/Video';
import videojs from 'video.js';

/**
 * Watch view
 */
export default Marionette.View.extend({
    template: _.template(require('./templates/watch.template.html')),

    model: Video,

    ui: {
        video: '#video-player'
    },

    modelEvents: {
        'change': 'render'
    },

    initialize: function (options) {
        _.extend(this, options);

        this.model = new Video({
            id: options.id
        });

        this.model.fetch({
            success: (data) => {
                console.log(data);
            }
        });

    },

    onRender: function () {
        setTimeout(500, () => {
            this.player = videojs('video-player', {}, function () {
                console.log('play');
                this.load();
                this.play();
            });
        });
    },

    serializeData: function () {
        let data = this.model.toJSON();
        return {
            name: data.name,
            synopsis: data.synopsis,
            id: data.id
        };
    }
});