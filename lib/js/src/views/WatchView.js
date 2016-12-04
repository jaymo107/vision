import Marionette from 'backbone.marionette';
import _ from 'underscore';
import Video from '../models/Video';
import $ from 'jquery';

/**
 * Watch view
 */
export default Marionette.View.extend({
    template: _.template(require('./templates/watch.template.html')),

    playerId: '',

    model: Video,

    ui: {
        video: '.player'
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

	onDomRefresh: function() {
		var controls = ["<div class='plyr__controls'>",
			"<span class='plyr__progress'>",
			"<label for='seek{id}' class='plyr__sr-only'>Seek</label>",
			"<input id='seek{id}' class='plyr__progress--seek' type='range' min='0' max='100' step='0.1' value='0' data-plyr='seek'>",
			"<progress class='plyr__progress--played' max='100' value='0' role='presentation'></progress>",
			"<progress class='plyr__progress--buffer' max='100' value='0'>",
			"<span>0</span>% buffered",
			"</progress>",
			"<span class='plyr__tooltip'>00:00</span>",
			"</span>",
			"<span class='plyr__time'>",
			"<span class='plyr__sr-only'>Current time</span>",
			"<span class='plyr__time--current'>00:00</span>",
			"</span>",
			"<span class='plyr__time'>",
			"<span class='plyr__sr-only'>Duration</span>",
			"<span class='plyr__time--duration'>00:00</span>",
			"</span>",
			"<button type='button' class='controllable' data-plyr='fullscreen'>",
			"<svg class='icon--exit-fullscreen'><use xlink:href='#plyr-exit-fullscreen'></use></svg>",
			"<svg><use xlink:href='#plyr-enter-fullscreen'></use></svg>",
			"<span class='plyr__sr-only'>Toggle Fullscreen</span>",
			"</button>",
			"</div>"].join("");

		let player = plyr.setup('.player', {
			//controls: ['play-large', 'progress', 'current-time', 'fullscreen'],
			keyboardShortcuts: { focused: false, global: false },
            html: controls
        });

		player[0].play();

		player[0].on('play', (event) => {
			console.log('[VIDEO] Playing the video')
			let instance = event.detail.plyr;
		});

		player[0].on('pause', (event) => {
			console.log('[VIDEO] Paused the video')
			let instance = event.detail.plyr;
			instance.toggleFullscreen();
		});

        // this.getUI('player').addEventListener('play', function(e) {
        //     console.log(e);
		//
        // });
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