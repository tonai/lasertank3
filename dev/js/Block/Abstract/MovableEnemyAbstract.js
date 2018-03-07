/**
 * Abstract movable enemy block class
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
    className: 'MovableEnemyAbstract',

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
    toolGroup: 'Movable enemies',

    /**
     * Id of the associated broken block
     *
     * @public
     */
    brokenId: null,

    /**
     * Init function
     */
    init: function(i, j) {
        this.parent(i, j);

        $(window).on(
            'move.' + this.intanceUniqIdentifier,
            $.proxy(
                function(event, game, block, direction) {
                    if ( block.id == 100 ) {
                        if ( block.xPos == this.xPos && this.direction % 2 === 0 ) {
                            if ( block.yPos < this.yPos && this.direction == 38 ) {
                                this.checkFire(game, block.yPos + 1, this.yPos, true);
                            } else if ( block.yPos > this.yPos && this.direction == 40 ) {
                                this.checkFire(game, this.yPos + 1, block.yPos, true);
                            }
                        } else if ( block.yPos == this.yPos && this.direction % 2 == 1 ) {
                            if ( block.xPos < this.xPos && this.direction == 37 ) {
                                this.checkFire(game, block.xPos + 1, this.xPos, false);
                            } else if ( block.xPos > this.xPos && this.direction == 39 ) {
                                this.checkFire(game, this.xPos + 1, block.xPos, false);
                            }
                        }
                    }
                },
                this
            )
        );
    },

    /**
     * Check if the tank is reacheable with a fire shot
     *
     * @param {Game} game
     * @param {Number} start : Start point for the "for" loop
     * @param {Number} end : End point for the "for" loop
     * @param {Boolean} vertical : Vertical check or not ?
     * @returns {EnemyAbstract} : Return itself for chain
     */
    checkFire: function(game, start, end, vertical) {
        var canFireThrough = true;
        for ( var i = start; i < end; i++ ) {
            if ( vertical  && game.map.blocks[i][ this.xPos ].canFireThrough() === false ||
                !vertical && game.map.blocks[ this.yPos ][i].canFireThrough() === false ) {
                canFireThrough = false;
            }
        }
        if ( canFireThrough ) {
            this.initFire(game);
        }
        return this;
    },

    /**
     * Callback called when a shot is fired through this block
     *
     * @public
     * @param {Game} game : Game object
     * @param {object} $canvas : Canvas context
     * @param {Number} direction : Direction of the shot
     * @param {Boolean} forceTerminate : force the shot to terminate (optional)
     * @returns {EnemyAbstract} : Return itself for chain
     */
    fireThrough: function(game, $canvas, direction, forceTerminate) {
        if ( direction == this.direction + 2 || direction == this.direction - 2 ) {
            if ( typeof this.brokenId != 'undefined' &&
                 this.brokenId != null ) {
                this.changeSelfType(game, this.brokenId);
            }
            setTimeout(
                function() {
                    $canvas.remove();
                    game.enableUi();
                },
                this.options.fireClearTimeout
            );
        } else {
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

            if ( i >= 0 &&
                 i < game.map.lines &&
                 j >= 0 &&
                 j < game.map.cols &&
                 game.map.blocks[i][j].canMoveOver(game) ) {
                this.parent(game, $canvas, direction, true);
                this.move(game, direction);
            } else {
                setTimeout(
                    function() {
                        $canvas.remove();
                        game.enableUi();
                    },
                    this.options.fireClearTimeout
                );
            }
        }

        return this;
    },

    /**
     * Unbind all events
     *
     * @public
     */
    destroy: function() {
        $(window).off('move.' + this.intanceUniqIdentifier);
    }
});
