/**
 * Created by JamesDavies on 28/11/2016.
 */
import _ from 'underscore';
import Backbone from 'backbone';

/**
 * Export the channel for message passing
 * @returns Backbone.Events
 * @constructor
 */
let Channel = function() {
    return _.extend({}, Backbone.Events);
};

export default new Channel();