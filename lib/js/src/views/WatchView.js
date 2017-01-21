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
        rated: '',
        series: '',
        type: '',
        writers: '',
        director: '',
        likes: 0,
        dislikes: 0
    },

    events: {
        'click .rating.like': 'like',
        'click .rating.dislike': 'dislike',
        'click #fullscreen': 'toggleFullscreen',
        'click #togglePlay': 'togglePlayback'
    },

    model: Video,

    ui: {
        video: '.player'
    },

    modelEvents: {
        'change': 'render'
    },

    addSlashes: function (str) {
        return (str + '').replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0');
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

                let programme_name = (data.get('name').includes('New: ')) ? data.get('name').replace('New: ', '') : data.get('name');
                programme_name = programme_name.replace(/["']/g, "");
                //programme_name = this.addSlashes(programme_name);//programme_name.replace(/"|'/g, '');
                let programme_id = data.get('id');
                let programme_image = data.get('image');
                let unescaped_name = data.get('name');
                let model = data;

                // Check if the meta data already exists on our end
                $.get('/meta/' + programme_id, (response) => {

                    if (response.response_num == 200) {
                        console.log('This programme exists in our db');

                        let data = response.data;

                        this.imdbMeta = {
                            imdbid: data.imdb_id,
                            actors: data.actors,
                            genres: data.genres,
                            poster: data.poster,
                            rating: data.rating,
                            rated: data.rated,
                            likes: data.likes,
                            dislikes: data.dislikes
                        };

                        this.renderMeta(this.imdbMeta);
                        return;
                    }

                    console.log('Doesnt exist, so query the imdb api');
                    console.log('SEARCH IMDB FOR: ');
                    console.log(programme_name);

                    imdb.getReq({name: programme_name}, (err, data) => {
                        console.log('[IMDB] Found from IDMB!');

                        console.log('Error from IMDB: ');
                        console.log(err);

                        this.imdbMeta = {
                            imdbid: data.imdbid,
                            actors: data.actors,
                            genres: data.genres,
                            poster: data.poster,
                            rating: data.rating,
                            rated: data.rated,
                            series: data.series,
                            type: data.type,
                            writers: data.writer,
                            director: data.director
                        };

                        // Store this metadata in the database if it doesn't already exist
                        console.log('[META] Preparing post request to /meta/' + programme_id);

                        console.log('[HISTORY] You should save this video to your history here: UserID: ' + window.App.user.id + ', programme_id: ' + programme_id);

                        console.log(this.getOption('imdbMeta'));


                    });

                    $.post('/meta/' + programme_id, {
                        'imdb_id': this.imdbMeta.imdbid,
                        'actors': this.imdbMeta.actors,
                        'genres': this.imdbMeta.genres,
                        'poster': this.imdbMeta.poster,
                        'rating': this.imdbMeta.rating,
                        'rated': this.imdbMeta.rated,
                        'series': (this.imdbMeta.series) ? 1 : 0, // var i = result ? 1 : 0;
                        'type': this.imdbMeta.type,
                        'writers': this.imdbMeta.writer,
                        'director': this.imdbMeta.director,
                        'programme_name': model.get('name'),
                        'image': model.get('image'),
                        'likes': 0,
                        'dislikes': 0,
                        'user': window.App.user.id
                    }, (response) => {
                        console.log('Storing request data: ');
                        console.log(response);
                    });

                    console.log('[IMDB] Render the imdb meta to the view.');

                    this.renderMeta(this.imdbMeta);

                });
            }
        });


    },

    renderMeta: function (meta) {

        // Can't load images from imdb, so check the source is from amazon
        if (meta.poster.includes('amazon')) {
            this.$('.poster').attr('src', meta.poster);
        }

        //if (meta.likes > 0 && meta.dislikes > 0) {
        this.$('.like-amount').html(meta.likes);
        this.$('.dislike-amount').html(meta.dislikes);
        //}

        this.$('.imdb-rating').html(meta.rating);
        this.$('.imdb-genres').html(meta.genres);
        this.$('.imdb-actors').html(meta.actors);
    },

    like: function (e) {

        $.post('/programmes/' + this.model.get('id') + '/rate', {type: 'like'}, (data) => {
            console.log(data);
            this.updateLikeDislikeButtons(data.type);

            this.refreshLikesOrDislikes(this.model.get('id'));

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
            // Increment the like button
            $dislike.removeAttr('disabled');
            $like.removeClass('btn-outline');

        } else {
            $dislike.removeClass('btn-outline');
            $like.removeAttr('disabled');
        }
    },

    refreshLikesOrDislikes: function (programme_id) {
        $.get('/meta/' + programme_id, (response) => {
            this.$('.like-amount').html(response.data.likes);
            this.$('.dislike-amount').html(response.data.dislikes);
        });
    },

    dislike: function (e) {
        console.log('Dislike this video');

        $.post('/programmes/' + this.model.get('id') + '/rate', {type: 'dislike'}, (data) => {
            console.log(data.type);
            this.updateLikeDislikeButtons(data.type);

            this.refreshLikesOrDislikes(this.model.get('id'));

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
            "</div>"].join("");

        this.player = plyr.setup('.player', {
            //controls: ['play-large', 'progress', 'current-time', 'fullscreen'],
            keyboardShortcuts: {focused: false, global: false},
            html: controls
        });

        this.player[0].play();

        this.player[0].on('playing', (event) => {
            console.log('[VIDEO] Playing the video');
            let instance = event.detail.plyr;
            this.$('#togglePlay').removeClass('disabled');
            this.updatePlayPauseButton(1);
        });

        this.player[0].on('waiting', (event) => {
            console.log('[VIDEO] Waiting...');
            let instance = event.detail.plyr;
            this.$('#togglePlay').html('<i class="fa fa-cog fa-spin"></i>');
        });

        this.player[0].on('pause', (event) => {
            console.log('[VIDEO] Paused the video');
            let instance = event.detail.plyr;
            this.updatePlayPauseButton(0);
        });

        this.player[0].on('timeupate', (event) => {
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

    toggleFullscreen: function (e) {
        console.log('Toggle fullscreen!');
        console.log(this.player[0]);
        this.player[0].toggleFullscreen();
    },

    updatePlayPauseButton: function (type) {
        let $button = this.$('#togglePlay');
        if (type == 1) {
            $button.html('<i class="fa fa-pause"></i>');
        } else {
            $button.html('<i class="fa fa-play"></i>');
        }
    },

    togglePlayback: function (e) {
        this.player[0].togglePlay();
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