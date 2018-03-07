/**
 * Editor toolbar panel class
 *
 * @author Tony Cabaye
 * @version svn : $Id$
 * @constructor
 * @param {LayerPane}l layer : Layer panel
 */
var $ = require('jquery');
var options = require('options');
var views = require('../views/editor.js');
var MessagePanel = require('../Common/MessagePanel.js');
module.exports = function(layer)
{
    // Basic checks
    if ( typeof layer != 'object' ||
         typeof layer.className != 'string' ||
         layer.className != 'LayerPanel' ) {
        return false;
    }

    /**
     * Class name
     *
     * @public
     */
    this.className = 'EditorToolbarPanel';

    /**
     * jQuery object of the trash
     *
     * @public
     */
    this.$trash = null;

    /**
     * jQuery object of the status panel
     *
     * @private
     */
    var $status = null;

    /**
     * jQuery object of the filename panel
     *
     * @private
     */
    var $filename = null;

    /**
     * jQuery object of the dimensions panel
     *
     * @private
     */
    var $dimensions = null;

    /**
     * jQuery object of the selected tool panel
     *
     * @private
     */
    var $selectedTool = null;

    /**
     * MessagePanel instance
     *
     * @private
     */
    var message = null;

    /**
     * Get the toolbar panel height
     *
     * @public
     * @returns {number} : The panel height
     */
    this.getHeight = function() {
        return $status.height();
    };

    /**
     * Select paint tool
     *
     * @public
     * @param {object} selectedTool : jQuery selected tool
     * @returns {EditorToolbarPanel} : Return itself for chain
     */
    this.selectTool = function(selectedTool) {
        if ( selectedTool instanceof $ ) {
            $selectedTool.css({
                backgroundImage: selectedTool.css('backgroundImage'),
                backgroundPosition: selectedTool.css('backgroundPosition'),
                width: selectedTool.width(),
                height: selectedTool.height()
            });
        }
        return this;
    };

    /**
     * Remove selected paint tool
     *
     * @public
     * @returns {EditorToolbarPanel} : Return itself for chain
     */
    this.removeTool = function() {
        $selectedTool.css({
            backgroundImage: 'none'
        });
        return this;
    };

    /**
     * Unbind all editor events
     *
     * @public
     */
    this.destroy = function() {
        $(window).off('.EditorToolbarPanel');
        if ( $status ) {
            $status.off('.EditorToolbarPanel');
        }
        if ( $filename ) {
            $filename.off('.EditorToolbarPanel');
        }
        if ( $dimensions ) {
            $dimensions.off('.EditorToolbarPanel');
        }
        if ( this.$trash ) {
            this.$trash.off('.EditorToolbarPanel');
        }
        if ( message && typeof message.destroy == 'function' ) {
            message.destroy();
        }
    };

    /**
     * Instanciate and bind events
     *
     * @public
     */
    this.init = function() {
        var context, template;

        // Render template
        template = $(
            views['editorToolbarPanel'](context)
        );

        // Find and keep DOM elements
        this.$trash = $('.editor-toolbar-panel--trash', template);
        $status = $('.editor-toolbar-panel--status', template);
        $filename = $('.editor-toolbar-panel--filename', template);
        $dimensions = $('.editor-toolbar-panel--dimensions', template);
        $selectedTool = $('.editor-toolbar-panel--selected-tool', template);

        // Instantiate message panel
        message = new MessagePanel(layer, $status);

        // Bind status panel events
        $status.on(
            'click.EditorToolbarPanel',
            $.proxy(
                function() {
                    if ( !message.isOpen() ) {
                        message.show();
                    } else {
                        message.hide();
                    }
                },
                this
            )
        );

        // Bind windows events
        $(window).on(
            'save.MapPanel',
            $.proxy(
                function(event, x, y, filename) {
                    $dimensions.html(x + 'x' + y);
                    $filename.html(filename);
                },
                this
            )
        );

        // Display template
        template.appendTo('body');
    };

    // Initialization
    this.init();
};
