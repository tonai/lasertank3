/**
 * Movable block block class
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
    className: 'MovableBlock',

    /**
     * Id of the block
     *
     * @public
     */
    id: 39,

    /**
     * Group for the block
     *
     * @public
     */
    toolGroup: 'Blocks',

    /**
     * Callback called when a shot is fired through this block
     *
     * @public
     * @param {Game} game : Game object
     * @param {object} $canvas : Canvas context
     * @param {Number} direction : Direction of the shot
     * @param {Boolean} forceTerminate : force the shot to terminate (optional)
     * @returns {MovableBlock} : Return itself for chain
     */
    fireThrough: function(game, $canvas, direction, forceTerminate) {
        var i = this.yPos;
        var j = this.xPos;
        switch(direction) {
        case 37:
            j--;
            break;

        case 38:
            i--;
            break;

        case 39:
            j++;
            break;

        case 40:
            i++;
            break;
        }
        if ( i >= 0 &&
             i < game.map.lines &&
             j >= 0 &&
             j < game.map.cols &&
             game.map.blocks[i][j].canMoveOver(game) ) {
            this.parent(game, $canvas, direction, true);
            this.move(game, direction);
        } else {
            setTimeout(
                function() {
                    $canvas.remove();
                    game.enableUi();
                },
                this.options.fireClearTimeout
            );
        }
        return this;
    }
});
