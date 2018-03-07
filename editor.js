"use strict";

/* Load classes */
var $ = require('jquery');
var Editor = require('./dev/js/Editor/Editor.js');

/* Initiate the editor */
new Editor();

/* Remove global variables */
if (typeof isProduction == 'boolean' && isProduction === true) {
    $.noConflict(true);
}
