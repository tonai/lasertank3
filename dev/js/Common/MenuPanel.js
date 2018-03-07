/**
 * Menu panel class
 *
 * @author Tony Cabaye
 * @version svn : $Id$
 * @constructor
 * @param {MapPanel} map : Object to operate on
 * @param {LayerPanel} layer : Layer panel
 */
var $ = require('jquery');
var options = require('options');
var views = require('../views/common.js');
var PopInPanel = require('./PopInPanel.js');
module.exports = function(map, layer)
{
    // Basic checks
    if ( typeof map != 'object' ||
         typeof map.className != 'string' ||
         map.className != 'MapPanel' ||
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
    this.className = 'MenuPanel';

    /**
     * jQuery object of the menu
     *
     * @private
     */
    var $menu = null;

    /**
     * Array of jQuery object of each menu link
     *
     * @private
     */
    var $links = [];

    /**
     * jQuery object of the new form
     *
     * @private
     */
    var $newForm = null;

    /**
     * jQuery object of the load form
     *
     * @private
     */
    var $loadForm = null;

    /**
     * jQuery object of the save form
     *
     * @private
     */
    var $saveForm = null;

    /**
     * PopIn instances
     *
     * @private
     */
    var popIn = {
        newPanel: {},
        loadPanel: {},
        savePanel: {}
    };

    /**
     * Get the menu panel height
     *
     * @public
     * @returns {number} : The panel height
     */
    this.getHeight = function() {
        return $menu.height();
    };

    /**
     * Add a new menu item to the menu
     *
     * @public
     * @param {object} menuItem : The definition of the item to add
     * @returns {MenuPanel} : Return itself for chain
     */
    this.addMenuItem = function(menuItem) {
        var li, a, callback = function(){};
        switch ( typeof menuItem['callback'] )
        {
        case 'function':
            callback = menuItem['callback'];
            break;

        case 'string':
            callback = eval( menuItem['callback'] );
            break;
        }
        li = document.createElement('li');
        $menu.append(li);
        a = document.createElement('a');
        $links[ $links.length ] = $(a)
            .attr('href', '#')
            .text( menuItem['name'] )
            .on('click.MenuPanel', callback)
            .appendTo(li);
        return this;
    };

    /**
     * Open the pop-in for new function
     *
     * @public
     * @returns {boolean} : False for link
     */
    this.newCallback = function() {
        var context, template;

        // Instanciation of the pop-in if not allready done
        if ( typeof popIn.newPanel.open != 'function' ) {
            popIn.newPanel = new PopInPanel(layer);
        }

        // Build pop-in new form
        if ( !popIn.newPanel.hasContent() ) {
            // Render template
            template = $(
                views['newPopIn'](context)
            );

            // Find and keep DOM elements
            $newForm = template;

            // Display template
            popIn.newPanel.setContent(template);

            // Bind event
            $newForm.on(
                'submit.MenuPanel',
                $.proxy(
                    function(event) {
                        var errorMessages = [];
                        var width = parseInt($('#map-new-width', $newForm).val(), 10);
                        var height = parseInt($('#map-new-height', $newForm).val(), 10);
                        event.preventDefault();

                        // Check errors
                        if ( width === '' || isNaN(width) ) {
                            errorMessages.push('Please enter a number for width');
                        }
                        if ( height === '' || isNaN(height) ) {
                            errorMessages.push('Please enter a number for height');
                        }

                        // Create new map or display errors
                        if ( errorMessages.length > 0) {
                            $(window).trigger('error.MessagePanel', errorMessages);
                        } else {
                            map.clearMap(width, height);
                            popIn.newPanel.close();
                            $(window).trigger('info.MessagePanel', 'New ' + width + '*' + height + ' map.');
                        }
                    },
                    this
                )
            );
        }

        // Open the pop-in
        popIn.newPanel.open();
        return this;
    };

    /**
     * Open the pop-in for load function
     *
     * @public
     * @returns {boolean} : False for link
     */
    this.loadCallback = function() {
        var template;

        // Instanciation of the pop-in if not allready done
        if ( typeof popIn.loadPanel.open != 'function' ) {
            popIn.loadPanel = new PopInPanel(layer);
        }

        // Build pop-in new form
        if ( !popIn.loadPanel.hasContent() ) {
            $.ajax({
                type: 'GET',
                url: options.loadPopInContentUrl,
                dataType: 'json'
            }).always(
                $.proxy(
                    function(context){
                        // Render template
                        template = $(
                            views['loadPopIn'](context)
                        );

                        // Find and keep DOM elements
                        $loadForm = template;

                        // Display template
                        popIn.loadPanel.setContent(template);

                        // Bind event
                        $loadForm.on(
                            'submit.MenuPanel',
                            $.proxy(
                                function() {
                                    event.preventDefault();

                                    // Load callback
                                    $.ajax({
                                        type: 'POST',
                                        url: options.loadPopInCallbackUrl,
                                        data: $loadForm.serialize(),
                                        dataType: 'json'
                                    }).always(
                                        $.proxy(
                                            function(data) {
                                                // Draw the map or display errors
                                                if ( data['success'] ) {
                                                    map.drawMap(
                                                        data['response']['map'],
                                                        data['response']['filename']
                                                    );
                                                    popIn.loadPanel.close();
                                                    $(window).trigger('load.Game')
                                                        .trigger(
                                                            'info.MessagePanel',
                                                            'Map "' + data['response']['filename'] + '" loaded.'
                                                        );
                                                } else {
                                                    $(window).trigger(
                                                        'error.MessagePanel',
                                                        data['response']
                                                    );
                                                }
                                            },
                                            this
                                        )
                                    );
                                },
                                this
                            )
                        );
                        return false;
                    },
                    this
                )
            );
        }

        // Open the pop-in
        popIn.loadPanel.open();
        return this;
    };

    /**
     * Open the pop-in for save function
     *
     * @public
     * @returns {boolean} : False for link
     */
    this.saveCallback = function() {
        var context, template;

        // Instanciation of the pop-in if not allready done
        if ( typeof popIn.savePanel.open != 'function' ) {
            popIn.savePanel = new PopInPanel(layer);
        }

        // Build pop-in new form
        if ( !popIn.savePanel.hasContent() ) {
            // Render template
            template = $(
                views['savePopIn'](context)
            );

            // Find and keep DOM elements
            $saveForm = template;

            // Display template
            popIn.savePanel.setContent(template);

            // Bind event
            $saveForm.on(
                'submit.MenuPanel',
                $.proxy(
                    function() {
                        event.preventDefault();

                        // Save callback
                        $.ajax({
                            type: 'POST',
                            url: options.savePopInCallbackUrl,
                            data: {
                                blocks: map.serialize(),
                                filename: $('#map-save-filename', $saveForm).val()
                            },
                            dataType: 'json'
                        }).always(
                            $.proxy(
                                function(data) {
                                    // Save the map (back management) or display errors
                                    if( data['success'] ) {
                                        map.saveMap( data['response']['filename'] );
                                        popIn.savePanel.close();
                                        $(window).trigger('info.MessagePanel', 'Map saved as "' + data['response']['filename'] + '".');
                                    } else {
                                        $(window).trigger('error.MessagePanel', data['response']);
                                    }
                                },
                                this
                            )
                        );
                    },
                    this
                )
            );
        }

        // Open the pop-in
        popIn.savePanel.open();
        return this;
    };

    /**
     * Unbind all editor events
     *
     * @public
     */
    this.destroy = function() {
        var i;
        $(window).off('.MenuPanel');
        if ( $menu ) {
            $menu.off('.MenuPanel');
        }
        if ( $newForm ) {
            $newForm.off('.MenuPanel');
        }
        if ( $loadForm ) {
            $loadForm.off('.MenuPanel');
        }
        if ( $saveForm ) {
            $saveForm.off('.MenuPanel');
        }
        for ( i in $links ) {
            if ( $links[i] ) {
                $links[i].off('.MenuPanel');
            }
        }
        for ( i in popIn ) {
            if ( popIn[i] && typeof popIn[i].destroy == 'function' ) {
                popIn[i].destroy();
            }
        }
    };

    /**
     * Instanciate and bind events
     *
     * @public
     */
    this.init = function() {
        var context, template;

        // Prepare context for template
        context = {
            homeUrl: options.homeUrl
        };

        // Render template
        template = $(
            views['menuPanel'](context)
        );

        // Find and keep DOM elements
        $menu = template;

        // Display template
        template.appendTo('body');
    };

    // Initialization
    this.init();
};
