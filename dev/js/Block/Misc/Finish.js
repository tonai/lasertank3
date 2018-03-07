/**
 * Finish block class
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
    className: 'Finish',

    /**
     * Id of the block
     *
     * @public
     */
    id: 1,

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
     * Callback called when a block move over this block
     *
     * @public
     * @param {Game} game : Game object
     * @param {BlockAbstract} block : Block that is moving over this block
     * @param {number} direction : Direction for the movement
     * @returns {Finish} : Return itself for chain
     */
    moveIn: function(game, block, direction){
        if ( block.id == 100 ) {
            $(window).trigger('win.lasertank');
        } else {
            this.parent(game, block, direction);
        }
        return this;
    }
});
