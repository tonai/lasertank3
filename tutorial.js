"use strict";

/* Load classes */
var $ = require('jquery');
var blockList = require('./dev/js/Block/block.js');
var options = require('options');
var Game = require('./dev/js/Game/Game.js');

/* Initiate the game */
new Game(blockList, options);

/* Remove global variables */
$.noConflict(true);
