import Marionette from 'backbone.marionette';
import _ from 'underscore';
import Video from '../models/Video';

/**
 * Watch view
 */
export default Marionette.View.extend({
    template: _.template(require('./templates/watch.template.html')),

    playerId: '',

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

        this.playerId = new Date().getTime();

        this.model.fetch({
            success: (data) => {
                console.log(data);
            }
        });
    },

    onRender: function() {
		plyr.setup('.player', {});
    },

    onShow: function () {
        console.log('showing');
    },

    templateContext: function(){
        return {
            playerId: this.getOption('playerId')
        };
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