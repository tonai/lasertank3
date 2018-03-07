/**
 * Arrow down block class
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
    className: 'ArrowDown',

    /**
     * Id of the block
     *
     * @public
     */
    id: 2,

    /**
     * Callback called when a block move over this block
     *
     * @public
     * @param {Game} game : Game object
     * @param {BlockAbstract} block : Block that is moving over this block
     * @param {number} direction : Direction for the movement
     * @returns {ArrowDown} : Return itself for chain
     */
    moveIn: function(game, block, direction){
        this.parent(game, block, 40);
        return this;
    }
});
