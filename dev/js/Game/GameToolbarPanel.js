/**
 * Game toolbar panel class
 *
 * @author Tony Cabaye
 * @version svn : $Id$
 * @constructor
 * @param {LayerPane}l layer : Layer panel
 */
var $ = require('jquery');
var options = require('options');
var views = require('../views/game.js');
var blockList = require('../Block/block.js');
var MessagePanel = require('../Common/MessagePanel.js');
module.exports = function(layer)
{
    // Basic checks
    if ( typeof blockList != 'object' ||
         typeof blockList.className != 'string' ||
         blockList.className != 'BlockList' ||
         typeof layer != 'object' ||
         typeof layer.className != 'string' ||
         layer.className != 'LayerPanel' ) {
        return false;
    }

    /**
     * Class name
     *
     * @public
     */
    this.className = 'GameToolbarPanel';

    /**
     * jQuery object of the status panel
     *
     * @private
     */
    var $status = null;

    /**
     * Array of keys
     *
     * @private
     */
    var keys = [];

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
     * @returns {number} : Return itself for chain
     */
    this.getHeight = function() {
        return $status.height();
    };

    /**
     * Get the quantity of a key
     *
     * @param {Number} blockId
     * @returns {Number} : quantity of the specific key
     */
    this.getKeyQuantity = function(blockId) {
        var key, quantity = 0;
        if ( blockId >= 20 && blockId <= 27 ) {
            key = blockId - 20;
            quantity = keys[key].value;
        }
        if ( blockId >= 30 && blockId <= 37 ) {
            key = blockId - 30;
            quantity = keys[key].value;
        }
        return quantity;
    };

    /**
     * Reset all key values
     *
     * @returns {GameToolbarPanel} : quantity of the specific key
     */
    this.reset = function() {
        for ( var i in keys ) {
            keys[i].value = 0;
            keys[i].$element.text( keys[i].value );
        }
        return this;
    };

    /**
     * Unbind all editor events
     *
     * @public
     */
    this.destroy = function() {
        $(window).off('.GameToolbarPanel');
        if ( $status ) {
            $status.off('.GameToolbarPanel');
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
        var context, template, $keyElements, i;

        // Prepare context for template
        context = {
            blocks: []
        };
        for ( i = 20; i < 28; i++ ) {
            context.blocks.push(
                blockList.blocks[i].prototype.getTemplateData()
            );
        }

        // Render template
        template = $(
            views['gameToolbarPanel'](context)
        );

        // Find and keep DOM elements
        $status = $('.game-toolbar-panel--status', template);
        $keyElements = $('.game-toolbar-panel--key', template);
        $keyElements.each(function(element) {
            keys.push({
                value:    0,
                $element: $(this)
            });
        });

        // Instantiate message panel
        message = new MessagePanel(layer, $status);

        // Bind status panel events
        $status.on(
            'click.GameToolbarPanel',
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

        // Bind window events
        $(window).on(
            'keyFound.GameToolbarPanel',
            $.proxy(
                function(event, blockId) {
                    var key = blockId - 20;
                    keys[key].value++;
                    keys[key].$element.text( keys[key].value );
                },
                this
            )
        ).on(
            'keyUsed.GameToolbarPanel',
            $.proxy(
                function(event, blockId) {
                    var key = blockId - 30;
                    keys[key].value--;
                    keys[key].$element.text( keys[key].value );
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
