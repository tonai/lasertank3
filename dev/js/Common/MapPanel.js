/**
 * Map panel class
 *
 * @author Tony Cabaye
 * @version svn : $Id$
 * @constructor
 * @param {boolean} animated : Animated map panel or not
 */
var $ = require('jquery');
var utils = require('utils');
var options = require('options');
var views = require('../views/common.js');
var blockList = require('../Block/block.js');
module.exports = function(animated)
{
    // Basic checks
    if ( typeof blockList != 'object' ||
         typeof blockList.className != 'string' ||
         blockList.className != 'BlockList' ) {
        return false;
    }

    /**
     * Class name
     *
     * @public
     */
    this.className = 'MapPanel';

    /**
     * jQuery object of the container panel
     *
     * @public
     */
    this.$container = null;

    /**
     * jQuery object of the map panel
     *
     * @public
     */
    this.$map = null;

    /**
     * jQuery object of the move panel (animated map)
     *
     * @public
     */
    var $move = null;

    /**
     * jQuery object of the shot panel (animated map)
     *
     * @public
     */
    var $shot = null;

    /**
     * jQuery object containing the move controls (animated map + mobile device)
     *
     * @public
     */
    var $moveControl = null;

    /**
     * jQuery object containing the shot control (animated map + mobile device)
     *
     * @public
     */
    var $shotControl = null;

    /**
     * 2 dimensions array of blocks objects
     *
     * @public
     */
    this.blocks = [];

    /**
     * Number of cols of array
     *
     * @public
     */
    this.cols = 0;

    /**
     * Number of line of array
     *
     * @public
     */
    this.line = 0;

    /**
     * Name of the map
     *
     * @private
     */
    var name = 0;

    /**
     * Map backup for reset
     *
     * @private
     */
    var backup = [];

    /**
     * Return the list of all block classes
     *
     * @public
     * @returns {BlockList} : Block manager object
     */
    this.getBlockList = function () {
        return blockList;
    };

    /**
     * Is the map instantiate is animated ?
     *
     * @public
     * @returns {boolean} : true or false
     */
    this.isAnimated = function () {
        if ( typeof animated == 'undefined' ) {
            animated = false;
        }
        return animated;
    };

    /**
     * Draw map from array
     *
     * @public
     * @param {object} blocks : Input table
     * @returns {MapPanel} : Return itself for chain
     */
    this.drawMap = function(blocks, name) {
        if ( blocks.length > 0 && blocks[0].length > 0 ) {
            // Variable declaration
            var tbody, tr, td, i, j;

            // Clear the map
            this.$map.empty();
            this.cols = 0;
            this.lines = 0;
            this.blocks = [];
            if ( typeof this.$move != 'undefined' ) {
                this.$move.empty();
            }
            if ( typeof this.$shot != 'undefined' ) {
                this.$shot.empty();
            }

            // Build the map from input blocks
            tbody = document.createElement('tbody');
            for (i = 0; i < blocks.length; i++) {
                tr = document.createElement('tr');
                this.blocks[i] = [];
                for (j = 0; j < blocks[i].length; j++) {
                    if ( !(blocks[i][j] in blockList.blocks) ) {
                        this.blocks[i][j] = new blockList.blocks['default'](i, j);
                    } else {
                        this.blocks[i][j] = new blockList.blocks[ blocks[i][j] ](i, j);
                    }
                    td = document.createElement('td');
                    this.blocks[i][j].drawMapElement( this, $(td) );
                    tr.appendChild(td);
                }
                tbody.appendChild(tr);
            }
            this.$map.append(tbody);
            this.cols = parseInt(j, 10);
            this.lines = parseInt(i, 10);
            this.saveMap(name);
            this.center();
        }
        return this;
    };

    /**
     * Draw "clean" map
     *
     * @public
     * @param {number} cols : Number of cols (optionnal)
     * @param {number} lines : Number of lines (optionnal)
     * @returns {MapPanel} : Return itself for chain
     */
    this.clearMap = function(cols, lines) {
        var blocks = [];
        for ( var i = 0; i < lines; i++ )
        {
            var line = new Array(cols);
            blocks.push(line);
        }
        this.drawMap(blocks, '');
        return this;
    };

    /**
     * Reset the map to what it was after all changements
     *
     * @public
     * @returns {MapPanel} : Return itself for chain
     */
    this.resetMap = function() {
        if ( confirm('Are you sure you want to reset the map?') ) {
            if ( $.isArray( backup[0] ) ) {
                this.drawMap(backup);
            } else {
                alert('There is no map to be reseted.');
            }
        }
        return this;
    };

    /**
     * Save the map for later reinitialisation
     *
     * @public
     * @returns {MapPanel} : Return itself for chain
     */
    this.saveMap = function(filename) {
        name = filename;
        backup = this.serialize();
        $(window).trigger('save.MapPanel', [this.cols, this.lines, name]);
        return this;
    };

    /**
     * Draw block in map at specified position
     *
     * @public
     * @param {object} dest : Map element to be modify
     * @param {object} src : Block element
     * @returns {MapPanel} : Return itself for chain
     */
    this.drawMapElement = function(dest, src) {
        var oldId, newId, td, tr, i, j;

        if ( dest instanceof $ &&
            $.contains(this.$map[0], dest[0]) &&
             src instanceof $ ) {
            oldId = dest.data('blockid');
            newId = src.data('blockid');
            if ( oldId  != newId ) {
                td = dest.parent();
                tr = td.parent();
                i = this.$map.find('tr').index(tr);
                j = tr.children('td').index(td);

                this.blocks[i][j] = new blockList.blocks[newId](i, j);
                this.blocks[i][j].drawMapElement(this, td);
            }
        }
        return this;
    };

    /**
     * Clear map element at specified position
     *
     * @public
     * @param {number} i : specify the line
     * @param {number} j : specify the col
     * @returns {MapPanel} : Return itself for chain
     */
    this.clearMapElement = function(i, j) {
        i = parseInt(i, 10);
        j = parseInt(j, 10);
        this.blocks[i][j] = new blockList.blocks['default'](i, j);
        var td = this.$map
            .find('tr')
            .eq(i)
            .children('td')
            .eq(j)
            .children('img').remove()
            .end();
        this.blocks[i][j].drawMapElement(this, td);
        return this;
    };

    /**
     * serialize the map for saving
     *
     * @public
     * @returns {object} : 2 dimensions array of number
     */
    this.serialize = function() {
        var blocks = [];
        for ( var i = 0; i < this.lines; i++ ) {
            blocks[i] = [];
            for ( var j = 0; j < this.cols; j++ ) {
                blocks[i][j] = this.blocks[i][j].id;
            }
        }
        return blocks;
    };

    /**
     * Center the map vertically
     *
     * @public
     * @returns {MapPanel} : Return itself for chain
     */
    this.center = function() {
        var height, top, left;
        var tbody = this.$map.find('tbody');

        if ( typeof tbody[0] != 'undefined' ) {
            top = parseInt(( this.$container.height() - tbody.height() ) / 2, 10);
            if ( top < 0 ) {
                top = 0;
            }

            left = parseInt(( this.$container.width() - tbody.width() ) / 2, 10);
            if ( left < 0 ) {
                left = 0;
            }

            this.$map.css({
                width: tbody.width(),
                marginTop: top,
                marginLeft: left
            });

            if (animated) {
                this.$move
                .add(this.$shot)
                .css({
                    height: this.$map.height(),
                    width: this.$map.width(),
                    top: top,
                    left: left
                });
            }
        }

        if ( this.$moveControl != null ) {
            height = this.$moveControl.height();
            this.$moveControl.css('top', ($(window).height() - height) / 2);
        }

        if ( this.$shotControl != null ) {
            height = this.$shotControl.height();
            this.$shotControl.css('top', ($(window).height() - height) / 2);
        }

        return this;
    };

    /**
     * Unbind all editor events
     *
     * @public
     */
    this.destroy = function() {
        $(window).off('.MapPanel');
        if ( this.$container ) {
            this.$container.off('.MapPanel');
        }
        if ( this.$map ) {
            this.$map.off('.MapPanel');
        }
        if ( this.$move ) {
            this.$move.off('.MapPanel');
        }
        if ( this.$shot ) {
            this.$shot.off('.MapPanel');
        }
        if ( this.$moveControl ) {
            this.$moveControl.find('span').off('.Game');
        }
        if ( this.$shotControl ) {
            this.$shotControl.off('.Game');
        }
    };

    /**
     * Instanciate and bind events
     *
     * @public
     */
    this.init = function() {
        var context, template;

        // Add styles
        $( document.createElement('style') )
            .attr('type', 'text/css')
            .text(
                '.map-panel table div { ' +
                    'width:' + options.imageWidth + 'px;' +
                    'height:' + options.imageHeight + 'px;' +
                '}' +
                '.map-panel td { ' +
                    'background-image:url("' + options.spriteSheetSrc + '");' +
                    'width:' + options.imageWidth + 'px;' +
                    'height:' + options.imageHeight + 'px;' +
                '}'
            )
            .appendTo('head');

        // Prepare context for template
        context = {
            animated: animated,
            touch: utils.isTouchDevice()
        };

        // Render template
        template = $(
            views['mapPanel'](context)
        );

        // Find and keep DOM elements
        this.$container = template;
        this.$map = $('.map-panel--map', template);
        if (context.animated) {
            this.$move = $('.map-panel--move', template);
            this.$shot = $('.map-panel--shot', template);
            if (context.touch) {
                this.$moveControl = $('.map-panel--move-controls', template);
                this.$shotControl = $('.map-panel--shot-control', template);
            }
        }

        // Build map container
        if ( utils.isTouchDevice() ) {
            this.$container.on(
                'mousedown.MapPanel',
                function(event) {
                    event.preventDefault();
                }
            );
        }

        // Display template
        template.appendTo('body');
    };

    // Initialization
    this.init();
};
