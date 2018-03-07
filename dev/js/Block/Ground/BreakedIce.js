/**
 * Breaked ice block class
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
    className: 'BreakedIce',

    /**
     * Id of the block
     *
     * @public
     */
    id: 8,

    /**
     * Callback called when a block move out of this block
     *
     * @public
     * @param {Game} game : Game object
     * @param {BlockAbstract} block : Block that is moving over this block
     * @param {number} direction : Direction for the movement
     * @returns {BlockAbstract} : Return itself for chain
     */
    moveOut: function(game, block, direction){
        this.changeSelfType(game, 18);
        return this;
    }
});
