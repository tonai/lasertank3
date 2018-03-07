/**
 * Abstract block class
 *
 * @author Tony Cabaye
 * @version svn : $Id$
 * @constructor
 * @param {number} i : column position initialization
 * @param {number} j : line position initialization
 */
var $ = require('jquery');
var utils = require('utils');
var options = require('options');
var Class = require('../Class.js');
module.exports = Class.create({
    /**
     * Class name
     *
     * @public
     */
    className: 'BlockAbstract',

    /**
     * Options
     *
     * @public
     */
    options: options,

    /**
     * Id of the block
     *
     * @public
     */
    id: '',

    /**
     * Instance uniq identifier generated when the instance is created
     *
     * @oublic
     */
    intanceUniqIdentifier: 0,

    /**
     * Type of the block
     *
     * @public
     */
    toolType: 'paint',

    /**
     * Group for the block
     *
     * @public
     */
    toolGroup: '',

    /**
     * The blocks image source
     *
     * @public
     */
    src: '',

    /**
     * Number of the column in the map
     *
     * @public
     */
    xPos: 0,

    /**
     * Number of the line in the map
     *
     * @public
     */
    yPos: 0,

    /**
     * jQuery object of the block image
     *
     * @public
     */
    $block: null,

    /**
     * Is the block animated ?
     *
     * @public
     */
    animated: false,

    /**
     * Block under this block
     *
     * @public
     */
    underBlock: null,

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
     * Can a fire shot pass through the block ?
     * (without being stopped or transformed...etc.)
     *
     * @public
     * @returns {Boolean}
     */
    canFireThrough: function() {
        return false;
    },

    /**
     * Init function
     */
    init: function(i, j) {
        if ( j >= 0 && !isNaN(j) ) {
            this.xPos = parseInt(j, 10);
        }
        if ( i >= 0 && !isNaN(i) ) {
            this.yPos = parseInt(i, 10);
        }
        this.intanceUniqIdentifier = utils.generateUniqIdentifier();
    },

    /**
     * Set the block
     *
     * @public
     * @param {object} element : jQuery element to set
     * @returns {BlockAbstract} : Return itself for chain
     */
    setBlock: function(element) {
        if ( element instanceof $ ) {
            this.$block = element;
            this.$block.on( 'destroyed', $.proxy(this.destroy, this) );
        }
        return this;
    },

    /**
     * Draw the image of the block in the map given element
     *
     * @public
     * @param {MapPanel} map : Map object
     * @param {object} dest : jQuery object where to append the block image (optional)
     * @returns {BlockAbstract} : Return itself for chain
     */
    drawMapElement: function(map, dest) {
        var $block, blockList = map.getBlockList();
        if ( typeof dest == 'undefined' ) {
            dest = map.$map
                .find('tr')
                .eq(this.yPos)
                .children('td')
                .eq(this.xPos);
        }

        if ( dest instanceof $ ) {
            if ( typeof this.drawMapElementBefore == 'function' ) {
                this.drawMapElementBefore(map);
            }

            dest.empty();
            if ( map.isAnimated() && this.animated ) {
                var width = this.options.imageWidth;
                var height = this.options.imageHeight;
                var img = new Image();
                var underBlock, context;

                underBlock = new blockList.blocks['default'](this.yPos, this.xPos);
                $block = $( document.createElement('div') )
                    .data('blockid', underBlock.id)
                    .css({
                        backgroundImage: 'url("' + this.options.spriteSheetSrc + '")'
                    }).appendTo(dest);
                underBlock.setBlock($block);
                this.underBlock = underBlock;

                $block = $( document.createElement('canvas') )
                    .data('blockid', this.id)
                    .attr('width', width)
                    .attr('height', height)
                    .css({
                        left: this.xPos * width,
                        top: this.yPos * height
                    })
                    .appendTo(map.$move);
                this.setBlock($block);

                img.src = this.options.spriteSheetSrc;
                img.onload = $.proxy(
                    function() {
                        context = this.$block[0].getContext('2d');
                        context.translate( (width / 2), (height / 2) );
                        context.save();
                        context.drawImage(
                            img,
                            (this.id%10) * this.options.imageWidth,
                            parseInt(this.id/10, 10) * this.options.imageHeight,
                            width,
                            height,
                            -(width / 2),
                            -(height / 2),
                            width,
                            height
                        );
                        context.restore();
                    },
                    this
                );
            } else {
                $block = $( document.createElement('div') )
                    .data('blockid', this.id)
                    .css({
                        backgroundImage: 'url("' + this.options.spriteSheetSrc + '")',
                        backgroundPosition: '-' + (this.id%10) * this.options.imageWidth + 'px ' +
                            '-' + parseInt(this.id/10, 10) * this.options.imageHeight + 'px'
                    }).appendTo(dest);
                this.setBlock($block);
            }
        }
        return this;
    },

    /**
     * Return data for templating
     *
     * @public
     * @returns {Object} : Template data
     */
    getTemplateData: function() {
        return {
            blockid: this.id,
            styles:  'background-image: url("' + this.options.spriteSheetSrc + '");' +
                'background-position: -' + (this.id%10) * this.options.imageWidth + 'px ' +
                '-' + parseInt(this.id/10, 10) * this.options.imageHeight + 'px'
        };
    },

    /**
     * Callback called when a block move over this block
     *
     * @public
     * @param {Game} game : Game object
     * @param {BlockAbstract} block : Block that is moving over this block
     * @param {number} direction : Direction for the movement
     * @returns {BlockAbstract} : Return itself for chain
     */
    moveIn: function(game, block, direction){
        game.enableUi();
        return this;
    },

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
     * @returns {BlockAbstract} : Return itself for chain
     */
    fireThrough: function(game, $canvas, direction, forceTerminate) {
        var endPoint = {
            fireX: (this.xPos + 0.5) * this.options.imageWidth,
            fireY: (this.yPos + 0.5) * this.options.imageHeight
        };

        if ( typeof forceTerminate == 'undefined' ) {
            forceTerminate = false;
        }

        switch( direction ) {
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
                    this.drawCallback(game, $canvas, direction, forceTerminate);
                },
                this
            )
        );
        return this;
    },

    /**
     * Fire draw callback
     *
     * @public
     * @param {Game} game : Game object
     * @param {object} $canvas : Canvas context
     * @param {Number} direction : Direction of the shot
     * @param {Boolean} forceTerminate : force the shot to terminate (optional)
     * @returns {BlockAbstract} : Return itself for chain
     */
    drawCallback: function(game, $canvas, direction, forceTerminate) {
        var i = this.yPos;
        var j = this.xPos;

        if ( typeof forceTerminate == 'undefined' ) {
            forceTerminate = false;
        }

        switch( direction ) {
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

        if ( !forceTerminate &&
             i >= 0 &&
             i < game.map.lines &&
             j >= 0 &&
             j < game.map.cols ) {
            game.map.blocks[i][j].fireThrough(game, $canvas, direction);
        } else {
            setTimeout(
                function() {
                    $canvas.remove();
                    game.enableUi();
                },
                this.options.fireClearTimeout
            );
        }
    },

    /**
     * Change this block in the map into an other
     *
     * @public
     * @returns {BlockAbstract} : Returns the newly created block
     */
    changeSelfType: function(game, Block){
        if ( typeof Block != 'undefined' && Block !== null ) {
            this.$block.remove();
            switch (typeof Block) {
            case 'function':
                game.map.blocks[this.yPos][this.xPos] = new Block(
                    this.yPos,
                    this.xPos
                );
                break;

            case 'object':
                game.map.blocks[this.yPos][this.xPos] = Block;
                break;

            case 'string':
                Block = eval(Block);
                if ( typeof Block == 'function' ) {
                    game.map.blocks[this.yPos][this.xPos] = new Block(
                        this.yPos,
                        this.xPos
                    );
                }
                break;

            case 'number':
                var blockList = game.map.getBlockList();
                if ( Block in blockList.blocks ) {
                    game.map.blocks[this.yPos][this.xPos] = new blockList.blocks[Block](
                        this.yPos,
                        this.xPos
                    );
                }
                break;
            }
            game.map.blocks[this.yPos][this.xPos].drawMapElement(game.map);
            this.destroy();
        }
        return game.map.blocks[this.yPos][this.xPos];
    },

    /**
     * Unbind all editor events
     *
     * @public
     */
    destroy: function() {}
});
