/**
 * Game manager class
 *
 * @author Tony Cabaye
 * @version svn : $Id$
 * @constructor
 */
var $ = require('jquery');
var utils = require('utils');
var options = require('options');
var blockList = require('../Block/block.js');
var MapPanel = require('../Common/MapPanel.js');
var LayerPanel = require('../Common/LayerPanel.js');
var MenuPanel = require('../Common/MenuPanel.js');
var GameToolbarPanel = require('./GameToolbarPanel.js');
module.exports = function()
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
    this.className = 'Game';

    /**
     * Map instance
     *
     * @public
     */
    this.map = null;

    /**
     * Tank block instance
     *
     * @public
     */
    this.tank = null;

    /**
     * Menu instance
     *
     * @private
     */
    var menu = null;

    /**
     * Toolbar instance
     *
     * @private
     */
    var toolbar = null;

    /**
     * Layer instance
     *
     * @private
     */
    var layer = null;

    /**
     * Used to block the user interface
     *
     * @private
     */
    var UiEnabled = 0;

    /**
     * Enable the UI
     *
     * @public
     * @returns {Game} : Return itself for chain
     */
    this.enableUi = function() {
        UiEnabled = Math.max(UiEnabled - 1, 0);
        return this;
    };

    /**
     * Disable the UI
     *
     * @public
     * @returns {Game} : Return itself for chain
     */
    this.disableUi = function() {
        UiEnabled++;
        return this;
    };

    /**
     * Is the UI enabled or not ?
     *
     * @public
     * @returns {Boolean} : true or false
     */
    this.isUiEnabled = function() {
        return (UiEnabled === 0);
    };

    /**
     * Adapt display to screen
     *
     * @public
     * @returns {Game} : Return itself for chain
     */
    this.resizeDisplay = function() {
        var gameHeight = $(window).height() - menu.getHeight() - toolbar.getHeight();
        this.map.$container.css({height: gameHeight});
        this.map.center();
        return this;
    };

    /**
     * Scroll the display depending on the tank position
     *
     * @public
     * @returns {Game} : Return itself for chain
     */
    this.scrollDisplay = function() {
        var width = this.map.$container.width();
        var height = this.map.$container.height();
        var scrollWidth = this.map.$container.prop('scrollWidth');
        var scrollHeight = this.map.$container.prop('scrollHeight');
        var tankPosition = this.map.$map
            .find('tr')
                .eq(this.tank.yPos)
                    .children('td')
                        .eq(this.tank.xPos)
                            .position();

        if ( scrollHeight > height ) {
            // Vertical display re-positioning
            if ( tankPosition['top'] < options.scrollBlockMargin * options.imageHeight ) {
                // Up
                this.map.$container.scrollTop(
                    Math.max( (this.tank.yPos - options.scrollBlockStep) * options.imageHeight, 0)
                );
            } else if ( tankPosition['top'] > ( height - (1 + options.scrollBlockMargin) * options.imageHeight ) ) {
                // Down
                this.map.$container.scrollTop(
                    Math.min(
                        (this.tank.yPos + options.scrollBlockStep + 1) * options.imageHeight,
                        scrollHeight
                    ) - height
                );
            }
        }

        if ( scrollWidth > width ) {
            // Horizontal display re-positioning
            if ( tankPosition['left'] < options.scrollBlockMargin * options.imageWidth ) {
                // Left
                this.map.$container.scrollLeft(
                    Math.max( (this.tank.xPos - options.scrollBlockStep) * options.imageWidth, 0)
                );
            } else if ( tankPosition['left'] >  ( width - (1 + options.scrollBlockMargin) * options.imageWidth ) ) {
                // Right
                this.map.$container.scrollLeft(
                    Math.min(
                        (this.tank.xPos + options.scrollBlockStep + 1) * options.imageWidth,
                        scrollWidth
                    ) - width
                );
            }
        }

        return this;
    };

    /**
     * Start dragging the map
     *
     * @public
     * @param {Object} event : Event object
     * @returns {Game} : Return itself for chain
     */
    this.startDrag = function(event) {
        var width = this.map.$container.width();
        var height = this.map.$container.height();
        var scrollWidth = this.map.$container.prop('scrollWidth');
        var scrollHeight = this.map.$container.prop('scrollHeight');
        var mousePos = {
            top: event.pageY,
            left: event.pageX
        };

        event.preventDefault();
        if ( scrollHeight > height || scrollWidth > width ) {
            this.map.$shot.addClass('grabbing');

            $(document).on(
                'mousemove.Game',
                $.proxy(
                    function(event) {
                        this.map.$container.scrollTop(
                            Math.max(
                                this.map.$container.scrollTop() - event.pageY + mousePos.top,
                                0
                            )
                        );
                        this.map.$container.scrollLeft(
                            Math.min(
                                this.map.$container.scrollLeft() - event.pageX + mousePos.left,
                                this.map.$container.prop('scrollHeight')
                            )
                        );
                        mousePos = {
                            top: event.pageY,
                            left: event.pageX
                        };
                    },
                    this
                )
            ).on(
                'mouseup.Game',
                $.proxy(
                    function() {
                        this.map.$shot.removeClass('grabbing');
                        $(document).off('mousemove.Game').off('mouseup.Game');
                    },
                    this
                )
            );
        }
    };

    /**
     * Move or rotate the tank to the given direction
     *
     * @param {Object} event
     * @param {Number} direction
     */
    this.move = function(event, direction) {
        event.preventDefault();
        if ( this.isUiEnabled() ) {
            if ( this.tank.direction == direction ) {
                this.tank.move(this);
            } else {
                this.tank.rotate(this, direction);
            }
        }
    };

    /**
     * Tank shot
     *
     * @param {Object} event
     */
    this.shot = function(event) {
        event.preventDefault();
        if ( this.isUiEnabled() ) {
            this.tank.initFire(this);
        }
    };

    /**
     * Get the quantity of a key
     *
     * @param {Number} blockId
     * @returns {Number} : quantity of the specific key
     */
    this.getKeyQuantity = function(blockId) {
        return toolbar.getKeyQuantity(blockId);
    };

    /**
     * Unbind all editor events
     *
     * @public
     */
    this.destroy = function() {
        $(window).off('.Game');
        if ( this.map && typeof this.map.destroy == 'function' ) {
            this.map.destroy();
        }
        if ( menu && typeof menu.destroy == 'function' ) {
            menu.destroy();
        }
        if ( toolbar && typeof toolbar.destroy == 'function' ) {
            toolbar.destroy();
        }
        if ( layer && typeof layer.destroy == 'function' ) {
            layer.destroy();
        }
    };

    /**
     * Instanciate and bind events
     *
     * @public
     */
    this.init = function() {
        // Instantiate map panel, bind events and attach to editor
        this.map = new MapPanel(blockList, true);
        this.map.$container.appendTo('body');

        // Instantiate layer panel
        layer = new LayerPanel();

        // Instantiate menu panel
        menu = new MenuPanel(this.map, layer);
        menu.addMenuItem({
            name: 'Load',
            callback: $.proxy(menu.loadCallback, menu)
        });
        /*menu.addMenuItem({
            name: 'Reset',
            callback: $.proxy(map.resetMap, map)
        });*/
        layer.append();

       // Instantiate toolbar panel
        toolbar = new GameToolbarPanel(layer);

        // Repositioning game panel after menu initialization
        this.map.$container.css({marginTop: menu.getHeight()});

        // Bind map events
        if ( utils.isTouchDevice() ) {
            this.map.$shot.on(
                'mousedown.Game',
                $.proxy(
                    this.startDrag,
                    this
                )
            );
        }

        // Screen size initialization
        this.resizeDisplay();

        // Bind window events
        $(window).on(
            'resize.Game',
            $.proxy(this.resizeDisplay, this)
        ).on(
            'save.MapPanel',
            $.proxy(
                function() {
                    var found = false;
                    var i = 0;
                    while ( i < this.map.lines && !found ) {
                        var j = 0;
                        while ( j < this.map.cols && !found ) {
                            if ( this.map.blocks[i][j].id == 100 ) {
                                this.tank = this.map.blocks[i][j];
                                UiEnabled = 0;
                                found = true;
                                this.scrollDisplay();
                            }
                            j++;
                        }
                        i++;
                    }
                },
                this
            )
        ).on(
            'move.Game',
            $.proxy(
                function(event, game, block, direction) {
                    if ( block.id == 100 ) {
                        this.scrollDisplay();
                    }
                },
                this
            )
        ).on(
            'load.Game',
            $.proxy(
                function() {
                    toolbar.reset();
                },
                this
            )
        );

        if ( this.map.$moveControl == null ) {
            $(window).on(
                'keydown.Game',
                $.proxy(
                    function(event) {
                        switch (event.keyCode) {
                        case 32: // Space bar
                            this.shot(event);
                            break;
                        case 37: // Left arrow
                            this.move(event, 37);
                            break;
                        case 38: // Up arrow
                            this.move(event, 38);
                            break;
                        case 39: // Right arrow
                            this.move(event, 39);
                            break;
                        case 40: // Down arrow
                            this.move(event, 40);
                            break;
                        }
                    },
                    this
                )
            );
        } else {
            $('#leftControl').on(
                'touchstart.Game',
                $.proxy(
                    function(event) {
                        $('#leftControl').addClass('touch');
                        this.move(event, 37);
                    },
                    this
                )
            );
            $('#topControl').on(
                'touchstart.Game',
                $.proxy(
                    function(event) {
                        $('#topControl').addClass('touch');
                        this.move(event, 38);
                    },
                    this
                )
            );
            $('#rightControl').on(
                'touchstart.Game',
                $.proxy(
                    function(event) {
                        $('#rightControl').addClass('touch');
                        this.move(event, 39);
                    },
                    this
                )
            );
            $('#bottomControl').on(
                'touchstart.Game',
                $.proxy(
                    function(event) {
                        $('#bottomControl').addClass('touch');
                        this.move(event, 40);
                    },
                    this
                )
            );
            $(this.map.$shotControl).on(
                'touchstart.Game',
                $.proxy(
                    function(event) {
                        this.map.$shotControl.addClass('touch');
                        this.shot(event);
                    },
                    this
                )
            )
            .add(this.map.$moveControl)
            .on(
                'touchend.Game',
                $.proxy(
                    function(event) {
                        this.map.$moveControl
                            .find('span')
                            .add(this.map.$shotControl)
                            .removeClass('touch');
                    },
                    this
                )
            );
        }
    };

    // Initialization
    $( this.init() );
};