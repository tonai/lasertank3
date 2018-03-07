/**
 * Abstract rotating mirror block class
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
    className: 'RotatingMirrorAbstract',

    /**
     * Id of the block
     *
     * @public
     */
    id: '',

    /**
     * Group for the block
     *
     * @public
     */
    toolGroup: 'Rotating mirrors',

    /**
     * Direction cross-reference table
     *
     * @public
     */
    fireDirections: {},

    /**
     * Callback called when a shot is fired through this block
     *
     * @public
     * @param {Game} game : Game object
     * @param {object} $canvas : Canvas context
     * @param {Number} direction : Direction of the shot
     * @param {Boolean} forceTerminate : force the shot to terminate (optional)
     * @returns {RotatingMirrorAbstract} : Return itself for chain
     */
    fireThrough: function(game, $canvas, direction, forceTerminate) {
        var i = this.yPos;
        var j = this.xPos;
        var endPoint = {
            fireX: (this.xPos + 0.5) * this.options.imageWidth,
            fireY: (this.yPos + 0.5) * this.options.imageHeight
        };

        if ( typeof forceTerminate == 'undefined' ) {
            forceTerminate = false;
        }

        if ( direction in this.fireDirections ) {
            $canvas.animate(
                endPoint,
                this.options.fireDuration,
                $.proxy(
                    function() {
                        switch( this.fireDirections[direction] ) {
                        case 37:
                            endPoint.fireX -= 0.5 * this.options.imageWidth;
                            delete endPoint.fireY;
                            break;

                        case 38:
                            endPoint.fireY -= 0.5 * this.options.imageHeight;
                            delete endPoint.fireX;
                            break;

                        case 39:
                            endPoint.fireX += 0.5 * this.options.imageWidth;
                            delete endPoint.fireY;
                            break;

                        case 40:
                            endPoint.fireY += 0.5 * this.options.imageHeight;
                            delete endPoint.fireX;
                            break;
                        }

                        $canvas.animate(
                            endPoint,
                            this.options.fireDuration,
                            $.proxy(
                                function() {
                                    this.drawCallback(game, $canvas, this.fireDirections[direction], forceTerminate);
                                },
                                this
                            )
                        );
                    },
                    this
                )
            );
        } else {
            $canvas.animate(
                endPoint,
                this.options.fireDuration,
                $.proxy(
                    function() {
                        direction = this.direction + 1;
                        if ( direction >= 41 ) {
                            direction = 37;
                        }
                        this.rotate(
                            game,
                            direction,
                            function(param) {
                                $canvas.remove();
                                game.enableUi();
                                this.changeSelfType(game, this.rotationId);
                            }
                        );
                    },
                    this
                )
            );
        }

        return this;
    }
});
