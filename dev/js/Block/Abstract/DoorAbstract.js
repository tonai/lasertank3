/**
 * Abstract door class
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
    className: 'DoorAbstract',

    /**
     * Id of the block
     *
     * @public
     */
    id: '',

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
    toolGroup: 'Doors',

    /**
     * Can an other block move over this block ?
     *
     * @public
     * @param {Game} game : Game object
     * @returns {Boolean}
     */
    canMoveOver: function(game){
        if ( game.getKeyQuantity(this.id) > 0 ) {
            $(window).trigger('keyUsed.GameToolbarPanel', [this.id]);
            this.$block
                .css({
                    position: 'relative',
                    top: 0
                })
                .animate(
                    {
                        top: this.options.imageHeight
                    },
                    this.options.doorOpeningDuration,
                    $.proxy(
                        this.changeSelfType,
                        this,
                        game,
                        0
                    )
                );
        }
        return false;
    }
});
