import Marionette from 'backbone.marionette';
import _ from 'underscore';
import $ from 'jquery';
import noty from "noty";

/**
 * Main Connect view for the app login
 */
export default Marionette.View.extend({
    el: '.container',

    template: _.template(require('./templates/connect.template.html')),

    events: {
        'click #connect': 'connect'
    },

    connect: function (e) {
        e.preventDefault();
        e.stopPropagation();

        let code = this.$('#connect-input').val();

        $.get('http://vision.lancs.ac.uk:9110/user/verify_external_pin?api=53e659a15aff4a402de2d51b98703fa1ade5b8c5&pin=' + code, response => {
            let data = response.data[0];
            let user_id = data.user_id;

            console.log('User found: ' + user_id);
        }).fail(function () {
            console.log("Couldn't find this user...");
            let n = noty({
                layout: 'top',
                modal: true,
                type: 'warning',
                theme: 'bootstrapTheme',
                text: "We couldn't find a user with that pin, please try again.",
                timeout: 2000
            });
        });

        console.log('Try to connect using code: ' + code);
    },

    initialize: function (options) {
        _.extend(this, options);
        this.render();
    }

});