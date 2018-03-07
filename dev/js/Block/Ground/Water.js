/**
 * Water block class
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
    className: 'Water',

    /**
     * Id of the block
     *
     * @public
     */
    id: 18,

    /**
     * Callback called when a block move over this block
     *
     * @public
     * @param {Game} game : Game object
     * @param {BlockAbstract} block : Block that is moving over this block
     * @param {number} direction : Direction for the movement
     * @returns {Water} : Return itself for chain
     */
    moveIn: function(game, block, direction){
        if ( block.id == 100 ) {
            $(window).trigger('gameover.lasertank');
        } else if ( block.id == 39 ) {
            block.changeSelfType(game, 19);
            game.enableUi();
        } else {
            block.changeSelfType(game, this);
            game.enableUi();
        }
        return this;
    }
});
