/**
 * Block block class
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
    className: 'Block',

    /**
     * Id of the block
     *
     * @public
     */
    id: 29,

    /**
     * Group for the block
     *
     * @public
     */
    toolGroup: 'Blocks',

    /**
     * Can an other block move over this block ?
     *
     * @public
     * @param {Game} game : Game object
     * @returns {Boolean}
     */
    canMoveOver: function(game) {
        return false;
    },

    /**
     * Can a fire shot pass through the block ?
     * (without being stopped or transformed...etc.)
     *
     * @public
     * @returns {Boolean}
     */
    canFireThrough: function() {
        return false;
    },

    /**
     * Callback called when a shot is fired through this block
     *
     * @public
     * @param {Game} game : Game object
     * @param {object} $canvas : Canvas context
     * @param {Number} direction : Direction of the shot
     * @param {Boolean} forceTerminate : force the shot to terminate (optional)
     * @returns {Block} : Return itself for chain
     */
    fireThrough: function(game, $canvas, direction, forceTerminate) {
        setTimeout(
            function() {
                $canvas.remove();
                game.enableUi();
            },
            this.options.fireClearTimeout
        );
        return this;
    }
});
