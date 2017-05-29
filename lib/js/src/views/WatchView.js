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

                let programme_name = (data.get('name').includes('New: ')) ? data.get('name').replace('New: ', '') : data.get('name');
                programme_name = programme_name.replace(/["']/g, "");
                //programme_name = this.addSlashes(programme_name);//programme_name.replace(/"|'/g, '');
                let programme_id = data.get('id');
                let programme_image = data.get('image');

                this.imdbMeta.poster = 'http://iptv-med-image.lancs.ac.uk/cache/200x200/programmes' + programme_image;
                let unescaped_name = data.get('name');
                let model = data;

                // Check if the meta data already exists on our end
                $.get('/meta/' + programme_id, (response) => {

                    if (response.response_num == 200) {
                    

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

                    let that = this;

                    $.ajax({
                        type: 'GET',
                        dataType: 'jsonp',
                        
                        url: 'https://www.omdbapi.com/?plot=full&r=json&t=' + programme_name + '&apikey=2e6134b5',
                        
                        success: function (data) {

                            console.log(data);

                            that.imdbMeta = {
                                imdbid: data.imdbID,
                                actors: data.Actors,
                                genres: data.Genres,
                                poster: data.Poster,
                                rating: data.imdbRating,
                                rated: data.Rated,
                                series: data.Series,
                                type: data.Type,
                                writers: data.Writer,
                                director: data.Director
                            };


                            $.post('/meta/' + programme_id, {
                                'imdb_id': that.imdbMeta.imdbid,
                                'actors': that.imdbMeta.actors,
                                'genres': that.imdbMeta.genres,
                                'poster': that.imdbMeta.poster,
                                'rating': that.imdbMeta.rating,
                                'rated': that.imdbMeta.rated,
                                'series': (that.imdbMeta.series) ? 1 : 0, // var i = result ? 1 : 0;
                                'type': that.imdbMeta.type,
                                'writers': that.imdbMeta.writer,
                                'director': that.imdbMeta.director,
                                'programme_name': model.get('name'),
                                'image': model.get('image'),
                                'likes': 0,
                                'dislikes': 0,
                                'user': window.App.user.id
                            }, (response) => {
                               
                            });

                            that.renderMeta(that.imdbMeta);
                        },

                        error: function () {
                            
                        }
                    });
                });
            }
        });


    },

    renderMeta: function (meta) {

        // Can't load images from imdb, so check the source is from amazon
        if (meta.poster.includes('amazon') || meta.poster.includes('lancs')) {
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

        $.post('/programmes/' + this.model.get('id') + '/rate', {type: 'like', user_id: localStorage.getItem("user_id")}, (data) => {
           
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
      

        $.post('/programmes/' + this.model.get('id') + '/rate', {
            type: 'dislike',
            user_id: window.App.user.id
        }, (data) => {
          
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
         
            let instance = event.detail.plyr;
            this.$('#togglePlay').removeClass('disabled');
            this.updatePlayPauseButton(1);
        });

        this.player[0].on('waiting', (event) => {
            
            let instance = event.detail.plyr;
            this.$('#togglePlay').html('<i class="fa fa-cog fa-spin"></i>');
        });

        this.player[0].on('pause', (event) => {
         
            let instance = event.detail.plyr;
            this.updatePlayPauseButton(0);
        });

     

        // Set the buttons
        $.get('/programmes/' + this.model.get('id') + '/rating', {user_id: localStorage.getItem("user_id")}, (data) => {
            // Get request made

            let type = data.type;

        

            this.updateLikeDislikeButtons(type);
        });
    },

    onShow: function () {
        
    },

    templateContext: function () {
        return {
            playerId: this.getOption('playerId')
        };
    },

    toggleFullscreen: function (e) {
      
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