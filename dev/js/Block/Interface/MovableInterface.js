/**
 * Movable interface
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
    className: 'MovableInterface',

    /**
     * Is the block animated ?
     *
     * @public
     */
    animated: true,

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
     * Move the block
     *
     * @public
     * @param {Game} game : Game object
     * @param {number} direction : Direction for the movement
     * @returns {MovableInterface} : Return itself for chain
     */
    move: function(game, direction) {
        var i = this.yPos;
        var j = this.xPos;

        if ( typeof direction == 'undefined' ) {
            if ( this.direction == 'undefined' ) {
                return this;
            } else {
                direction = this.direction;
            }
        }

        game.disableUi();

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
            game.map.blocks[this.yPos][this.xPos] = this.underBlock;
            this.underBlock.moveOut(game, this, direction);
            this.underBlock = game.map.blocks[i][j];
            game.map.blocks[i][j] = this;
            this.xPos = j;
            this.yPos = i;
            this.$block.animate({
                    left: this.xPos * this.options.imageWidth,
                    top: this.yPos * this.options.imageHeight
                },
                this.options.moveDuration,
                $.proxy(
                    function() {
                        $(window).trigger( 'move', [game, this, direction] );
                        this.underBlock.moveIn(game, this, direction);
                    },
                    this
                )
            );
        } else {
            game.enableUi();
        }

        return this;
    }
});
