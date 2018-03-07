"use strict";

/* Load classes */
var $ = require('jquery');
var Game = require('./dev/js/Game/Game.js');

/* Initiate the game */
new Game();

/* Remove global variables */
if (typeof isProduction == 'boolean' && isProduction === true) {
    $.noConflict(true);
}
