'use strict';

import $ from 'jquery';
import Backbone from 'backbone';
import Marionette from 'backbone.marionette';
import AppRouter from './src/routers/Router';
import Event from './src/common/Event';

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

        this.on("start", function() {
            if (Backbone.history) Backbone.history.start();
            App.setViewportScale();
            App.setControllerNavigation();

			let controls = ["<div class='plyr__controls'>",
				"<button type='button' data-plyr='restart'>",
				"<svg><use xlink:href='#plyr-restart'></use></svg>",
				"<span class='plyr__sr-only'>Restart</span>",
				"</button>",
				"<button type='button' data-plyr='rewind'>",
				"<svg><use xlink:href='#plyr-rewind'></use></svg>",
				"<span class='plyr__sr-only'>Rewind {seektime} secs</span>",
				"</button>",
				"<button type='button' data-plyr='play'>",
				"<svg><use xlink:href='#plyr-play'></use></svg>",
				"<span class='plyr__sr-only'>Play</span>",
				"</button>",
				"<button type='button' data-plyr='pause'>",
				"<svg><use xlink:href='#plyr-pause'></use></svg>",
				"<span class='plyr__sr-only'>Pause</span>",
				"</button>",
				"<button type='button' data-plyr='fast-forward'>",
				"<svg><use xlink:href='#plyr-fast-forward'></use></svg>",
				"<span class='plyr__sr-only'>Forward {seektime} secs</span>",
				"</button>",
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
				"<button type='button' data-plyr='fullscreen'>",
				"<svg class='icon--exit-fullscreen'><use xlink:href='#plyr-exit-fullscreen'></use></svg>",
				"<svg><use xlink:href='#plyr-enter-fullscreen'></use></svg>",
				"<span class='plyr__sr-only'>Toggle Fullscreen</span>",
				"</button>",
				"</div>"].join("");

			window.player = plyr.setup('.player', {
			    html: controls,
				keyboardShortcuts: { focused: true, global: true },
                debug: true,
            });
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
