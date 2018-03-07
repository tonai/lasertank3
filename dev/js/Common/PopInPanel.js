/**
 * PopIn panel class
 *
 * @author Tony Cabaye
 * @version svn : $Id$
 * @constructor
 * @param {LayerPanel} layer : Layer panel
 */
var $ = require('jquery');
var options = require('options');
var views = require('../views/common.js');
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
    this.className = 'PopInPanel';

    /**
     * jQuery object of the popIp panel
     *
     * @private
     */
    var $popIn;

    /**
     * jQuery object of the popIn content
     *
     * @private
     */
    var $content;

    /**
     * Check if the pop-in has content
     *
     * @public
     * @returns {boolean} : True or false
     */
    this.hasContent = function() {
        return ( $content.html() !== '' );
    };

    /**
     * Set the pop-in content
     *
     * @public
     * @param {object|string} html : DOM, string or jQuery object
     * @returns {PopInPanel} : Return itself for chain
     */
    this.setContent = function(html) {
        $content.append(html);
        this.center();
        return this;
    };

    /**
     * Open the pop-in
     *
     * @public
     * @returns {PopInPanel} : Return itself for chain
     */
    this.open = function() {
        layer.open(this.className, 0);
        $popIn.show();
        return this;
    };

    /**
     * Close the pop-in
     *
     * @public
     * @returns {PopInPanel} : Return itself for chain
     */
    this.close = function() {
        layer.close(this.className);
        $popIn.hide();
        return this;
    };

    /**
     * Center pop-in to the screen
     *
     * @public
     * @returns {PopInPanel} : Return itself for chain
     */
    this.center = function() {
        var $window = $(window);
        $popIn.css({
            left: ( $window.width() - $popIn.width() ) / 2,
            top: ( $window.height() - $popIn.height() ) / 2
        });
        return this;
    };

    /**
     * Unbind all editor events
     *
     * @public
     */
    this.destroy = function() {
        $(window).off('.PopInPanel');
        if ( $popIn ) {
            $popIn.off('.PopInPanel');
        }
        if ( $content ) {
            $content.off('.PopInPanel');
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
            views['popInPanel'](context)
        );

        // Find and keep DOM elements
        $popIn = template;
        $content = $('.popin--content', template);

        // Center and bind event on window
        this.center();
        $(window).on(
            'resize.PopInPanel',
            $.proxy(this.center, this )
        );

        layer.$layer.on(
            'click.PopInPanel',
            $.proxy(
                function() {
                    this.close();
                    return false;
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
