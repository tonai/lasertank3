/**
 * Tank block class
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
    className: 'Tank',

    /**
     * Id of the block
     *
     * @public
     */
    id: 100,

    /**
     * Type of the block
     *
     * @public
     */
    toolType: 'draggable',

    /**
     * Group for the block
     *
     * @public
     */
    toolGroup: 'Start & finish',

    /**
     * Draw the image in the map at the right place
     *
     * @public
     * @param {MapPanel} map : Map object for insertion
     * @return {Tank} : Return itself for chain
     */
    drawMapElementBefore: function(map){
        if ( typeof map == 'object' &&
             typeof map.className == 'string' &&
             map.className == 'MapPanel' &&
             !map.isAnimated() ) {
            var i = 0;
            var j = 0;
            var lastJ = 0;
            var found = 0;

            while ( i < map.lines && found < 1 ) {
                j = 0;
                lastJ = j;
                while ( j < map.cols && found < 1 ) {
                    if ( map.blocks[i][j].id == this.id &&
                         ( i != this.yPos || j != this.xPos ) )
                    {
                        lastJ = j;
                        found++;
                    }
                    j++;
                }
                i++;
            }
            if ( lastJ != -1 && found == 1 ) {
                map.clearMapElement(i - 1, lastJ);
            }
        }
        return this;
    },

    /**
     * Callback called when a shot is fired through this block
     *
     * @public
     * @param {Game} game : Game object
     * @param {object} $canvas : Canvas context
     * @param {Number} direction : Direction of the shot
     * @param {Boolean} forceTerminate : force the shot to terminate (optional)
     * @returns {Tank} : Return itself for chain
     */
    fireThrough: function(game, $canvas, direction, forceTerminate) {
        $(window).trigger('gameover.lasertank');
        return this;
    }
});
