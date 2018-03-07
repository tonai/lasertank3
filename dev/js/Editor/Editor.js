/**
 * Editor manager class
 *
 * @author Tony Cabaye
 * @version svn : $Id$
 * @constructor
 */
var $ = require('jquery');
var utils = require('utils');
var options = require('options');
var blockList = require('../Block/block.js');
var MessagePanel = require('../Common/MessagePanel.js');
var EditorPanel = require('./EditorPanel.js');
var MapPanel = require('../Common/MapPanel.js');
var LayerPanel = require('../Common/LayerPanel.js');
var MenuPanel = require('../Common/MenuPanel.js');
var EditorToolbarPanel = require('./EditorToolbarPanel.js');
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
    this.className = 'Editor';

    /**
     * Editor instance
     *
     * @private
     */
    var editor = null;

    /**
     * Map instance
     *
     * @private
     */
    var map = null;

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
     * Save the mouse button position
     *
     * @private
     */
    var mouseDown = false;

    /**
     * Selected paint tool block
     *
     * @private
     */
    var paintTool = null;

    /**
     * Selected drag tool block
     *
     * @private
     */
    var dragTool = null;

    /**
     * Select paint tool
     *
     * @public
     * @param {object} event : Event calling this action
     * @returns {Editor} : Return itself for chain
     */
    this.selectTool = function(event) {
        if( event.target && event.target.nodeName == 'DIV' ) {
            paintTool = $(event.target);
            editor.$editor.css('cursor', 'url(' + options.cursor + '), auto');
            toolbar.selectTool(paintTool);
            $(window).on(
                'keydown.Editor',
                $.proxy(
                    function(event) {
                        if ( event.keyCode == 27 ) {
                            this.removeTool();
                        }
                    },
                    this
                )
            );
        }
        return this;
    };

    /**
     * Remove selected paint tool
     *
     * @public
     * @returns {Editor} : Return itself for chain
     */
    this.removeTool = function() {
        if ( !$.isEmptyObject(paintTool) ) {
            paintTool = null;
            editor.$editor.css('cursor', 'default');
            toolbar.removeTool(paintTool);
            $(window).off('keydown.Editor');
        }
        return this;
    };

    /**
     * Select drag tool and bind event for dragging
     *
     * @public
     * @param {object} src : Source block
     * @param {number} left : left position for drag
     * @param {number} top : top position for drag
     * @returns {Editor} : Return itself for chain
     */
    this.startDrag = function(src, left, top) {
        if( src && src.nodeName == 'DIV' ) {
            var clone = src.cloneNode(true);
            dragTool = $(clone)
                .data( 'blockid', $.data(src, 'blockid') )
                .css({
                    position: 'absolute',
                    top: parseInt(top, 10),
                    left: parseInt(left, 10),
                    width: options.imageWidth,
                    height: options.imageHeight
                }).appendTo('body');

            // Bind drag events
            $(document).on(
                'mousemove.Editor',
                $.proxy(
                    function(event) {
                        if( !$.isEmptyObject(dragTool) ) {
                            dragTool.css({
                                top: event.clientY + 1,
                                left: event.clientX + 1,
                            });
                        }
                    },
                    this
                )
            ).on(
                'mouseup.Editor',
                $.proxy(
                    function(event) {
                        if ( !$.isEmptyObject(dragTool) ) {
                            event.preventDefault();
                            if ( event.target.nodeName == 'DIV' ) {
                                map.drawMapElementFromCoordinates(event.clientX, event.clientY, dragTool);
                                //map.drawMapElement($(event.target), dragTool);
                            }
                            this.stopDrag();
                        }
                    },
                    this
                )
            );
        }
        return this;
    };

    /**
     * Stop dragging
     *
     * @public
     * @returns {Editor} : Return itself for chain
     */
    this.stopDrag = function() {
        dragTool.remove();
        dragTool = null;
        $(document).off('mousemove.Editor');
        $(document).off('mouseup.Editor');
        return this;
    };

    /**
     * Adapt display to screen
     *
     * @public
     * @returns {Editor} : Return itself for chain
     */
    this.resizeDisplay = function() {
        var editorHeight = $(window).height() - menu.getHeight() - toolbar.getHeight();
        editor.$editor.css({height: editorHeight});
        map.center();
        return this;
    };

    /**
     * Unbind all editor events
     *
     * @public
     */
    this.destroy = function() {
        $(window).off('.Editor');
        $(document).off('.Editor');
        if ( editor && typeof editor.destroy == 'function' ) {
            editor.destroy();
        }
        if ( map && typeof map.destroy == 'function' ) {
            map.destroy();
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
        // Instantiate editor panel
        editor = new EditorPanel();

        // Instantiate map panel and attach to editor
        map = new MapPanel(false);
        map.$container.css({
            marginLeft: editor.$dragCol.width(),
            marginRight: editor.$paintCol.width()
        }).appendTo(editor.$editor);

        // Bind drag events
        if ( !utils.isTouchDevice() ) {
            editor.$dragCol.on(
                'mousedown.EditorPanel',
                $.proxy(
                    function(event) {
                        event.preventDefault();
                        this.startDrag(event.target, event.clientX + 1, event.clientY + 1);
                        return false;
                    },
                    this
                )
            );
        } else {
            // For touh devices drag is not handy => use paint
            editor.$dragCol.on(
                'click.EditorPanel',
                $.proxy(this.selectTool, this)
            );
        }

        // Bind paint events
        editor.$paintCol.on(
            'click.EditorPanel',
            $.proxy(this.selectTool, this)
        );
        if ( !utils.isTouchDevice() ) {
            map.$container.on(
                'mousedown.MapPanel',
                function(event) {
                    mouseDown = true;
                    event.preventDefault();
                    if ( event.target.nodeName == 'DIV' &&
                         event.target != this &&
                         !$.isEmptyObject(paintTool) ) {
                        map.drawMapElement($(event.target), paintTool);
                    }
                }
            ).on(
                'mouseover.MapPanel',
                function(event) {
                    var $target, $parent;
                    if( event.target.nodeName == 'DIV' && event.target != this ) {
                        $target = $(event.target);
                        $parent = $target.parent()
                            .css('borderColor', '#FF0000');
                        $parent.prev()
                            .css('borderColor', '#000000 #FF0000 #000000 #000000');
                        $parent.parent()
                            .prev()
                            .children()
                            .eq( $parent.index() )
                            .css('borderColor', '#000000 #000000 #FF0000 #000000');

                        if ( !$.isEmptyObject(paintTool) && mouseDown ) {
                            map.drawMapElement($target, paintTool);
                        }
                    }
                }
            ).on(
                'mouseout.MapPanel',
                function(event) {
                    $(map.$container).find('td')
                        .css('borderColor', '#000000');
                }
            );
            $(document).on(
                'mouseup.MapPanel',
                function(event) {
                    mouseDown = false;
                }
            );
        } else {
            map.$container.on(
                'touchstart.MapPanel',
                function(event) {
                    if ( event.target.nodeName == 'DIV' &&
                         event.target != this &&
                         !$.isEmptyObject(paintTool) ) {
                        event.preventDefault();
                        map.drawMapElement($(event.target), paintTool);
                    }
                }
            );
        }

        // Instantiate layer panel
        layer = new LayerPanel();

        // Instantiate menu panel
        menu = new MenuPanel(map, layer);
        menu.addMenuItem({
            name: 'New',
            callback: $.proxy(menu.newCallback, menu)
        });
        menu.addMenuItem({
            name: 'Load',
            callback: $.proxy(menu.loadCallback, menu)
        });
        menu.addMenuItem({
            name: 'Save',
            callback: $.proxy(menu.saveCallback, menu)
        });
        menu.addMenuItem({
            name: 'Reset',
            callback: $.proxy(map.resetMap, map)
        });
        layer.append();

        // Instantiate toolbar panel
        toolbar = new EditorToolbarPanel(layer);
        toolbar.$trash.on(
            'click.EditorToolbarPanel',
            $.proxy(this.removeTool, this)
        );

        // Repositions editor panel after menu initialization
        editor.$editor.css({marginTop: menu.getHeight()});

        // Screen size initialization
        this.resizeDisplay();
        $(window).on(
            'resize.Editor',
            $.proxy(this.resizeDisplay, this)
        );
    };

    // Initialization
    this.init();
};