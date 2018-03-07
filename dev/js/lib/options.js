var $ = require('jquery');
var options = {
    // Global options
    backendBaseUrl: 'https://urdre8k8nk.execute-api.eu-west-3.amazonaws.com/dev/',
    spriteSheetSrc: '../images/spriteSheet.png',
    imageWidth:     29,
    imageHeight:    29,

    // Fire interface options
    fireDuration:     25,
    fireClearTimeout: 50,
    fireWidth:        1,
    fireColor:        'rgb(255, 0, 0)',
    fireLineCap:      'butt',
    fireLineJoin:     'bevel',

    // Rotating interface options
    rotationDuration: 50,

    // Game options
    scrollBlockStep:   3,
    scrollBlockMargin: 3,

    // Editor options
    cursor : '../images/icon/painbrush.cur',

    // Layer options
    layerOpeningDuration: 200,

    // Menu options
    homeUrl: 'index.html',

    // Message options
    messageColor:                {
        error: 'rgb(255, 0, 0)',
        info: 'rgb(0, 255, 0)'
    },
    messageFleetingOpenDuration: 2000,
    messageBlinkDuration:        2000,
    messageParagraphHeight:      24,

    // Blocks options
    doorOpeningDuration: 100
};

$.extend(
    options,
    {
       // Backend mapping
        loadPopInContentUrl:  options.backendBaseUrl + 'list',
        loadPopInCallbackUrl: options.backendBaseUrl + 'load',
        savePopInCallbackUrl: options.backendBaseUrl + 'save',

        // Move interface options
        moveDuration: options.fireDuration * 2
    }
);

module.exports = options;
