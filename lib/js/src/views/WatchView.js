import Marionette from 'backbone.marionette';
import _ from 'underscore';
import Video from '../models/Video';
import $ from 'jquery';
import noty from "noty";
import imdb from 'imdb-api';

/**
 * Watch view
 */
export default Marionette.View.extend({
    template: _.template(require('./templates/watch.template.html')),

    playerId: '',

    imdbMeta: {
        imdbid: '',
        actors: '',
        genres: '',
        poster: '',
        rating: '',
        rated: ''
    },

    events: {
        'click .rating.like': 'like',
        'click .rating.dislike': 'dislike'
    },

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

                console.log('SEARCH IMDB FOR: ');
                console.log((data.get('name')));

                let programme_name = data.get('name').replace(/[^\w\s]/gi, '');

                imdb.get(programme_name).then((data) => {
                    console.log('[IMDB] Found from IDMB!');

                    this.imdbMeta = {
                        imdbid: data.imdbid,
                        actors: data.actors,
                        genres: data.genres,
                        poster: data.poster,
                        rating: data.rating,
                        rated: data.rated
                    };

                    // Store this metadata in the database if it doesn't already exist
                    /**
                     * $.post('meta/store', (response) => {
                     *      do something here
                     * });
                     */

                    console.log('[IMDB] Render the imdb meta to the view.');

                    this.renderMeta(this.imdbMeta);

                    console.log(this.getOption('imdbMeta'));


                });
            }
        });


    },

    renderMeta: function (meta) {

        // Can't load images from imdb, so check the source is from amazon
        if (meta.poster.includes('amazon')) {
            this.$('.poster').attr('src', meta.poster);
        }

        this.$('.imdb-rating').html(meta.rating);
        this.$('.imdb-genres').html(meta.genres);
        this.$('.imdb-actors').html(meta.actors);
    },

    like: function (e) {

        $.post('/programmes/' + this.model.get('id') + '/rate', {type: 'like'}, (data) => {
            console.log(data);
            this.updateLikeDislikeButtons(data.type);

            let n = noty({
                layout: 'top',
                modal: true,
                type: 'success',
                theme: 'bootstrapTheme',
                text: 'This programme was added to your likes, thank you.',
                timeout: 2000
            });
        });
    },

    updateLikeDislikeButtons: function (type) {

        if (type == '') {
            this.$('.your-rating').html('<em>You haven\'t rated this programme yet.</em>');
            return;
        }

        this.$('.your-rating').html('<em>You ' + type + 'd this programme.</em>');

        this.$('.rating').attr('disabled', true);
        this.$('.rating').addClass('btn-outline');

        let $dislike = this.$('.rating.dislike');
        let $like = this.$('.rating.like');

        if (type == 'like') {
            $dislike.removeAttr('disabled');
            $like.removeClass('btn-outline');
        } else {
            $dislike.removeClass('btn-outline');
            $like.removeAttr('disabled');
        }

    },

    dislike: function (e) {
        console.log('Dislike this video');

        $.post('/programmes/' + this.model.get('id') + '/rate', {type: 'dislike'}, (data) => {
            console.log(data.type);
            this.updateLikeDislikeButtons(data.type);

            let n = noty({
                layout: 'top',
                modal: true,
                type: 'success',
                theme: 'bootstrapTheme',
                text: 'This programme was added to your dislikes, thank you.',
                timeout: 2000
            });

        });
    },

    onDomRefresh: function () {
        let controls = ["<div class='plyr__controls'>",
            "<span class='plyr__progress'>",
            "<label for='seek{id}' class='plyr__sr-only'>Seek</label>",
            "<input id='seek{id}' class='plyr__progress--seek' type='range' min='0' max='100' step='0.1' value='0'" +
            " data-plyr='seek' tabIndex='-1'>",
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
            keyboardShortcuts: {focused: false, global: false},
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

        player[0].on('timeupate', (event) => {
            console.log('Time has updated');
        });

        // Set the buttons
        $.get('/programmes/' + this.model.get('id') + '/rating', (data) => {
            // Get request made

            let type = data.type;

            console.log('The type of rating returned is: ' + type);

            this.updateLikeDislikeButtons(type);
        });
    },

    onShow: function () {
        console.log('showing');
    },

    templateContext: function () {
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