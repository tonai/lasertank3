/**
 * Rotating interface
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
    className: 'RotatingInterface',

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
     * Is the block animated ?
     *
     * @public
     */
    animated: true,

    /**
     * The new Id of the block after the rotation
     *
     * @public
     */
    rotationId: null,

    /**
     * Direction of the block
     *
     * @public
     */
    direction: 38,

    /**
     * Rotation degre of the block
     *
     * @public
     */
    degre: 0,

    /**
     * Set the block
     *
     * @public
     * @param {object} element : jQuery element to set
     * @returns {RotatingInterface} : Return itself for chain
     */
    setBlock: function(element) {
        if ( element instanceof $ ) {
            element.prop('rotate', 0).prop('src', this.options.spriteSheetSrc);
        }
        return this.parent(element);
    },

    /**
     * Rotate the block
     *
     * @public
     * @param {Game} game : Game object
     * @param {number} direction : Direction for the movement
     * @param {function} callback : Function to be called when the rotation finish
     * @returns {RotatingInterface} : Return itself for chain
     */
    rotate: function(game, direction, callback) {
        var degre = (direction - this.direction) * 90;
        if ( Math.abs(degre) == 270 ) {
            degre = degre - (degre / 270) * 360;
        }
        game.disableUi();
        this.direction = direction;
        this.degre += degre;
        this.$block.animate(
            {rotate: this.degre},
            this.options.rotationDuration,
            $.proxy(
                function() {
                    if ( typeof callback == 'function' ) {
                        callback.call(this);
                    }
                    game.enableUi();
                },
                this
            )
        );

        return this;
    }
});
