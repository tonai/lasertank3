/**
 * Fire interface
 *
 * @author Tony Cabaye
 * @version svn : $Id$
 * @constructor
 * @param {number} i : column position initialization
 * @param {number} j : line position initialization
 */
var $ = require('jquery');
var Class = require('../Class.js');
module.exports = Class.create({
    /**
     * Class name
     *
     * @public
     */
    className: 'FireInterface',

    /**
     * Direction of the block
     *
     * @public
     */
    direction: null,

    /**
     * Fire a shot
     *
     * @public
     * @param {Game} game : Game object
     * @returns {FireInterface} : Return itself for chain
     */
    initFire: function(game) {
        if ( typeof this.direction == 'undefined' || this.direction == null ) {
            return this;
        }

        // Init canvas
        var $canvas = $( document.createElement('canvas') )
            .attr( 'width', game.map.$shot.width() )
            .attr( 'height', game.map.$shot.height() )
            .appendTo(game.map.$shot);

        // Calculate the start position
        var i = this.yPos;
        var j = this.xPos;
        var x = (j + 0.5) * this.options.imageWidth;
        var y = (i + 0.5) * this.options.imageHeight;
        switch( this.direction ) {
        case 37:
            j--;
            x -= 0.5 * this.options.imageWidth;
            break;

        case 38:
            i--;
            y -= 0.5 * this.options.imageHeight;
            break;

        case 39:
            j++;
            x += 0.5 * this.options.imageWidth;
            break;

        case 40:
            i++;
            y += 0.5 * this.options.imageHeight;
            break;
        }

        if ( i >= 0 &&
             i < game.map.lines &&
             j >= 0 &&
             j < game.map.cols ) {
            // Init canvas style
            var context = $canvas[0].getContext('2d');
            context.lineWidth = this.options.fireWidth;
            context.strokeStyle = this.options.fireColor;
            context.lineCap = this.options.fireLineCap;
            context.lineJoin = this.options.fireLineJoin;

            // Init start point and start drawing
            game.disableUi();
            context.moveTo( parseInt(x, 10), parseInt(y, 10) );
            $canvas.prop('fireX', x)
                .prop('fireY', y);
            game.map.blocks[i][j].fireThrough(game, $canvas, this.direction);
        }
        return this;
    }
});
