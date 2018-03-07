/**
 * Breakable block block class
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
    className: 'BreakableBlock',

    /**
     * Id of the block
     *
     * @public
     */
    id: 38,

    /**
     * Callback called when a shot is fired through this block
     *
     * @public
     * @param {Game} game : Game object
     * @param {object} $canvas : Canvas context
     * @param {Number} direction : Direction of the shot
     * @param {Boolean} forceTerminate : force the shot to terminate (optional)
     * @returns {BreakableBlock} : Return itself for chain
     */
    fireThrough: function(game, $canvas, direction, forceTerminate) {
        setTimeout(
            $.proxy(
                function() {
                    $canvas.remove();
                    game.enableUi();
                    this.changeSelfType(game, 0);
                },
                this
            ),
            this.options.fireClearTimeout
        );
        return this;
    }
});
