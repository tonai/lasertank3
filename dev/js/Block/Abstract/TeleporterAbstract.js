/**
 * Abstract teleporter block class
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
    className: 'TeleporterAbstract',

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
    toolGroup: 'Teleporters',

    /**
     * Draw the image in the map at the right place
     *
     * @public
     * @param {MapPanel} map : Map object for insertion
     * @return {TeleporterAbstract} : Return itself for chain
     */
    drawMapElementBefore: function(map) {
        if ( typeof map == 'object' &&
             typeof map.className == 'string' &&
             map.className == 'MapPanel' &&
             !map.isAnimated() ) {
            var lastJ, i = 0, j = 0, found = 0;
            while ( i < map.lines && found < 2 ) {
                j = 0;
                lastJ = j;
                while ( j < map.cols && found < 2 ) {
                    if ( map.blocks[i][j].id == this.id &&
                        ( i != this.yPos || j != this.xPos ) )
                    {
                        lastJ = j;
                        found++;
                    }
                    j++;
                }
                i++;
            }
            if ( lastJ != -1 && found == 2 ) {
                map.clearMapElement(i - 1, lastJ);
            }
        }
        return this;
    },

    /**
     * Callback called when a block move over this block
     *
     * @public
     * @param {Game} game : Game object
     * @param {BlockAbstract} block : Block that is moving over this block
     * @param {number} direction : Direction for the movement
     * @return {TeleporterAbstract} : Return itself for chain
     */
    moveIn: function(game, block, direction){
        var i = 0, j = 0;
        var teleporter = null;
        while ( i < game.map.lines && teleporter == null )
        {
            j = 0;
            while ( j < game.map.cols && teleporter == null )
            {
                if ( game.map.blocks[i][j].id == this.id &&
                     ( i != this.yPos || j != this.xPos ) )
                {
                    teleporter = game.map.blocks[i][j];
                }
                j++;
            }
            i++;
        }

        if ( teleporter != null ) {
            game.map.blocks[this.yPos][this.xPos] = block.underBlock;
            game.map.blocks[i - 1][j - 1] = block;
            block.underBlock = teleporter;
            block.yPos = i - 1;
            block.xPos = j - 1;
            block.$block.css({
                left: block.xPos * this.options.imageWidth,
                top: block.yPos * this.options.imageHeight
            });
        }

        game.enableUi();
        return this;
    }
});
