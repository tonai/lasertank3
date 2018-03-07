/**
 * Message panel class
 *
 * @author Tony Cabaye
 * @version svn : $Id$
 * @constructor
 * @param {LayerPanel} layer : Layer panel
 * @param {object} panel : jQuery Object to attach to message panel to
 */
var $ = require('jquery');
var options = require('options');
module.exports = function(layer, panel)
{
    // Basic checks
    if ( typeof layer != 'object' ||
         typeof layer.className != 'string' ||
         layer.className != 'LayerPanel' ||
         !(panel instanceof $) ) {
        return false;
    }

    /**
     * Class name
     *
     * @public
     */
    this.className = 'MessagePanel';

    /**
     * jQuery object of the message panel
     *
     * @private
     */
    var $message = null;

    /**
     * Is the message panel open ?
     *
     * @private
     */
    var open = false;

    /**
     * Was the message panel manually opened ?
     *
     * @private
     */
    var manuallyOpened = false;

    /**
     * Message panel background color
     *
     * @private
     */
    var backgroundColor = null;

    /**
     * Message opening queue
     *
     * @private
     */
    var queue = [];

    /**
     * Array of timer for fleeting open method
     *
     * @private
     */
    var fleetingOpenTimeout = [];

    /**
     * Show the message panel
     *
     * @public
     * @returns {MessagePanel} : Return itself for chain
     */
    this.show = function() {
        manuallyOpened = true;
        for ( var i in fleetingOpenTimeout ) {
            clearTimeout( fleetingOpenTimeout[i] );
        }
        $message.children('p').data('open.MessagePanel', true);
        this.open();
        return this;
    };

    /**
     * Hide the message panel
     *
     * @public
     * @returns {MessagePanel} : Return itself for chain
     */
    this.hide = function() {
        $message.children('p').data('open.MessagePanel', false);
        this.close(true);
        manuallyOpened = false;
        return this;
    };

    /**
     * Open the message panel
     *
     * @public
     * @returns {MessagePanel} : Return itself for chain
     */
    this.open = function() {
        this.resize();
        if ( $message.height() > 0 ) {
            var id = this.className + '-' + queue.length;
            queue.push(id);
            layer.open(id, $message.offset().top);
        }
        return this;
    };

    /**
     * Close the message panel
     *
     * @public
     * @param {boolean} force : Forces the closure of the message panel
     * @returns {MessagePanel} : Return itself for chain
     */
    this.close = function(force) {
        if ( force ) {
            while ( queue.length > 0 ) {
                layer.close( queue.shift() );
            }
        } else {
            layer.close( queue.pop() );
        }

        this.resize();
        return this;
    };

    /**
     * Is the message panel open ?
     *
     * @public
     * @returns {boolean} : True or false
     */
    this.isOpen = function() {
        return open;
    };

    /**
     * Resize the message panel
     *
     * @public
     * @returns {MessagePanel} : Return itself for chain
     */
    this.resize = function() {
        var numberMessage = 0;
        $message.children('p').each(function(){
            var $this = $(this);
            if( $this.data('open.MessagePanel') ) {
                $this.show();
                numberMessage++;
            } else {
                $this.hide();
            }
        });

        var height = numberMessage * options.messageParagraphHeight;
        if ( height > 0 ) {
            if ( panel.offset().top < height ) {
                height = $(window).height() - panel.height();
            }
            $message.css({
                    height: height,
                    top: -height
                }).show()
                .scrollTop($message.prop('scrollHeight') - height);
            open = true;
        } else {
            $message.css({
                height: 0,
                top: 0
            }).hide();
            open = false;
        }
        return this;
    };

    /**
     * Add message to message panel
     *
     * @public
     * @param {object} messages : Messages to add
     * @param {string} type : 'error' or 'info'
     * @returns {MessagePanel} : Return itself for chain
     */
    this.addMessage = function(messages, type)
    {
        if ( messages.length > 0 && typeof type == 'string' ) {
            var span, attr, text, paragraphs = [];
            type = type.toLowerCase();
            for ( var i in messages ) {
                paragraphs[i] = document.createElement('p');
                span = document.createElement('span');
                attr = document.createAttribute('class');
                attr.nodeValue = 'message-panel--' + type;
                span.setAttributeNode(attr);
                text = document.createTextNode('[' + type.charAt(0).toUpperCase() + type.substr(1) + ']');
                span.appendChild(text);
                paragraphs[i].appendChild(span);
                text = document.createTextNode( ' : ' + messages[i] );
                paragraphs[i].appendChild(text);
                $message.append(paragraphs[i]);
                $(paragraphs[i]).data('open.MessagePanel', true);
            }
            if ( !manuallyOpened ) {
                fleetingOpenTimeout.push(
                    window.setTimeout(
                        $.proxy(
                            function() {
                                $(paragraphs).data('open.MessagePanel', false);
                                this.close();
                            },
                            this
                        ),
                        options.messageFleetingOpenDuration
                    )
                );
            }
            this.blink( panel, options.messageColor[type] );
            this.open();
        }
        return this;
    };

    /**
     * Blink from color 1 to 2 the background color of an element.
     * Background colors must be defined this way : rgb(a, b, c)
     *
     * @public
     * @param {object} $element : jQuery element that will blink
     * @param {string} color : Color of the background that will blink
     * @returns {MessagePanel} : Return itself for chain
     */
    this.blink = function($element, color1) {
        if( $element instanceof $ ) {
            if (backgroundColor === '') {
                backgroundColor = panel.css('backgroundColor');
            }
            $element.stop()
                .css('backgroundColor', color1)
                .animate(
                    {backgroundColor: backgroundColor},
                    options.messageBlinkDuration
                );
        }
        return this;
    };

    /**
     * Unbind all editor events
     *
     * @public
     */
    this.destroy = function() {
        $(window).off('.MessagePanel');
        if ( $message ) {
            $message.off('.MessagePanel');
        }
    };

    /**
     * Instanciate and bind events
     *
     * @public
     */
    this.init = function() {
        backgroundColor = panel.css('backgroundColor');

        // Build message panel
        var div = document.createElement('div');
        $message = $(div)
            .attr('class', 'message-panel')
            .appendTo(panel);

        // Bind windows events
        $(window).on(
            'error.MessagePanel',
            $.proxy(
                function() {
                    var messages = [];
                    for ( var i in arguments ) {
                        if ( i > 0 ) {
                            messages.push( arguments[i] );
                        }
                    }
                    if ( messages.length > 0 ) {
                        this.addMessage(messages, 'error');
                    }
                },
                this
            )
        ).on(
            'info.MessagePanel',
            $.proxy(
                function(event, message) {
                    var messages = [];
                    for ( var i in arguments ) {
                        if ( i > 0 ) {
                            messages.push( arguments[i] );
                        }
                    }
                    if ( messages.length > 0 ) {
                        this.addMessage(messages, 'info');
                    }
                },
                this
            )
        );
    };

    // Initialization
    this.init();
};
