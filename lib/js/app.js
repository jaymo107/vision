'use strict';

import $ from 'jquery';
import Backbone from 'backbone';
import Marionette from 'backbone.marionette';
import AppRouter from './src/routers/Router';
import Event from './src/common/Event';
import slick from 'slick-carousel';

global.$ = global.jQuery = $;
require('bootstrap');
/**
 * Main Class, start the application from here
 */
class App extends Marionette.Application {

    constructor(...args) {

        super(...args);

        this.debugMode = false;
        this.authenticated = false;
        this.user = null;

        let router = new AppRouter();

        // Send you to the login

        this.on("start", function() {
            if (Backbone.history) Backbone.history.start();
            App.setViewportScale();
            App.setControllerNavigation();
        });
    }

    /**
     * Set the viewport scale of the window dynamically in order to
     * set the dimensons for the TV.
     */
    static setViewportScale() {
        var vp = document.getElementById('viewport');
        var initialScale = Math.max(screen.width, screen.height) / 1920;
        vp.setAttribute('content', 'width=device-width, initial-scale=' + initialScale + ', maximum-scale=' + initialScale);
    }

    /**
     * Use the SpacialNavigation.js plugin which allows controllers to
     * navigate around the app using the keys.
     */
    static setControllerNavigation() {
        window.addEventListener('load', function() {
              // Initialize
              SpatialNavigation.init();

              // Define navigable elements (anchors and elements with "focusable" class).
              SpatialNavigation.add({
                selector: 'a, .controllable, input, button'
              });

              // Make the *currently existing* navigable elements focusable.
              SpatialNavigation.makeFocusable();

              // Focus the first navigable element.
              SpatialNavigation.focus('#nav-home');
            });
    }

}

/**
 * Start the application
 */
new App().start();
