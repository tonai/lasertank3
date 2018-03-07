/**
 * layer panel class
 *
 * @author Tony Cabaye
 * @version svn : $Id$
 * @constructor
 */
var $ = require('jquery');
var options = require('options');
module.exports = function()
{
    /**
     * Class name
     *
     * @public
     */
    this.className = 'LayerPanel';

    /**
     * jQuery object of the Layer panel
     *
     * @public
     */
    this.$layer = null;

    /**
     * Height and top position of the layer
     *
     * @private
     */
    var data = {
        height: 0,
        top: 0
    };

    /**
     * Layer opening queue
     *
     * @private
     */
    var queue = {};

    /**
     * Is the layer allready initialized ?
     *
     * @private
     */
    var initialized = false;

    /**
     * Append the layer to the body
     *
     * @public
     * @returns {LayerPanel} : Return itself for chain
     */
    this.append = function() {
        if ( !initialized ) {
            this.$layer.appendTo('body');
            initialized = true;
        }
        return this;
    };

    /**
     * Open the layer and add to queue
     *
     * @public
     * @param {string|number} id : id for opening queue
     * @param {string|number} top : top position for the layer
     * @returns {LayerPanel} : Return itself for chain
     */
    this.open = function(id, top) {
        if ( typeof id == 'string' || typeof id == 'number' ) {
            queue[id] = top;
            this.resize();
        }
        return this;
    };

    /**
     * Close the layer or delete in the queue
     *
     * @public
     * @param {string} id : id for opening queue
     * @returns {LayerPanel} : Return itself for chain
     */
    this.close = function(id) {
        if ( id in queue ) {
            delete queue[id];
            this.resize();
        }
        return this;
    };

    /**
     * Convert the top position from string ('%' or 'px') to int
     *
     * @public
     * @param {string|number} value : data to be converted
     * @returns {number} : The value converted to int
     */
    this.convert = function(value) {
        if ( typeof(value) == 'string' && value.indexOf('%') !== false ) {
            value = parseInt(value, 10) * $(window).height() / 100;
        } else {
            value = parseInt(value, 10);
        }
        return value;
    };

    /**
     * Resize and adapt the layer size and position
     *
     * @public
     * @returns {LayerPanel} : Return itself for chain
     */
    this.resize = function() {
        var length = 0;
        var windowHeight = $(window).height();
        data = {
            height: 0,
            top: windowHeight
        };
        for ( var i in queue ) {
            var top = this.convert( queue[i] );
            if ( top < data.top ) {
                data.top = queue[i];
            }
            length++;
        }
        if ( length === 0 ) {
            data = {
                height: 0,
                top: '100%'
            };
            $(window).off('resize.LayerPanel');
        } else {
            if ( data.top === 0 ) {
                data.height = '100%';
                $(window).off('resize.LayerPanel');
            } else {
                data.height = windowHeight - this.convert( data.top );
                $(window).on(
                    'resize.LayerPanel',
                    $.proxy(this.resizeDisplay, this)
                );
            }
        }
        this.$layer.animate(data, options.layerOpeningDuration);
        return this;
    };

    /**
     * Adapt display to screen
     *
     * @public
     * @returns {LayerPanel} : Return itself for chain
     */
    this.resizeDisplay = function() {
        this.$layer.css('top', $(window).height() - data.height);
        return this;
    };

    /**
     * Unbind all editor events
     *
     * @public
     */
    this.destroy = function() {
        $(window).off('.LayerPanel');
        if ( this.$layer ) {
            this.$layer.off('.LayerPanel');
            this.$layer.off('.PopInPanel');
        }
    };

    /**
     * Instanciate and bind events
     *
     * @public
     */
    this.init = function() {
        // Build layer
        this.$layer = $( document.createElement('div') )
            .attr('class', 'layer');
    };

    // Initialization
    this.init();
};
