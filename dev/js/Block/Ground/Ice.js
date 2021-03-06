/**
 * Ice block class
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
    className: 'Ice',


    /**
     * Id of the block
     *
     * @public
     */
    id: 9,

    /**
     * Callback called when a block move over this block
     *
     * @public
     * @param {Game} game : Game object
     * @param {BlockAbstract} block : Block that is moving over this block
     * @param {number} direction : Direction for the movement
     * @returns {Ice} : Return itself for chain
     */
    moveIn: function(game, block, direction){
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

        game.enableUi();
        if ( i >= 0 &&
             i < game.map.lines &&
             j >= 0 &&
             j < game.map.cols &&
             game.map.blocks[i][j].canMoveOver(game) ) {
            block.move(game, direction);
        }

        return this;
    }
});
