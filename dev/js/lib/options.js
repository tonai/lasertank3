var $ = require('jquery');
var options = {
    // Global options
    backendBaseUrl: (typeof isProduction == 'boolean' && isProduction === true)?
        'http://82.216.19.180:8961/backend/':
        '/lasertank/src/backend/',
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
        loadPopInContentUrl:  options.backendBaseUrl + 'loadContent.php',
        loadPopInCallbackUrl: options.backendBaseUrl + 'load.php',
        savePopInCallbackUrl: options.backendBaseUrl + 'save.php',

        // Move interface options
        moveDuration: options.fireDuration * 2
    }
);

module.exports = options;
