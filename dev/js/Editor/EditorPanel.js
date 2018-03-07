/**
 * Editor panel class
 *
 * @author Tony Cabaye
 * @version svn : $Id$
 * @constructor
 */
var $ = require('jquery');
var options = require('options');
var views = require('../views/editor.js');
var blockList = require('../Block/block.js');
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
    this.className = 'EditorPanel';

    /**
     * jQuery object of the editor panel
     *
     * @public
     */
    this.$editor = null;

    /**
     * jQuery object of the paint column
     *
     * @public
     */
    this.$paintCol = null;

    /**
     * jQuery object of the drag column
     *
     * @public
     */
    this.$dragCol = null;

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
     * Unbind all editor events
     *
     * @public
     */
    this.destroy = function() {
        $(window).off('.EditorPanel');
        if ( this.$editor ) {
            this.$editor.off('.EditorPanel');
        }
        if ( this.$paintCol ) {
            this.$paintCol.off('.EditorPanel');
        }
        if ( this.$dragCol ) {
            this.$dragCol.off('.EditorPanel');
        }
    };

    /**
     * Instanciate and bind events
     *
     * @public
     */
    this.init = function() {
        var context, template, blocks, i, j;

        // Add styles
        $( document.createElement('style') )
            .attr('type', 'text/css')
            .text(
                '.editor-panel li div { ' +
                    'background-color:transparent;' +
                    'width:' + options.imageWidth + 'px;' +
                    'height:' + options.imageHeight + 'px;' +
                '}' +
                '.editor-panel li { ' +
                    'background-image:url("' + options.spriteSheetSrc + '");' +
                    'width:' + options.imageWidth + 'px;' +
                    'height:' + options.imageHeight + 'px;' +
                '}'
            )
            .appendTo('head');

        // Prepare context for template
        context = {
            paintColTitle: blockList.paintBlocks.title,
            paintColGroups: [],
            dragColTitle: blockList.dragBlocks.title,
            dragColGroups: []
        };
        for ( i in blockList.paintBlocks.groups ) {
            blocks = [];
            for ( j in blockList.paintBlocks.groups[i] ) {
                blocks.push(
                    blockList.paintBlocks.groups[i][j].getTemplateData()
                );
            }
            context.paintColGroups.push({
                title: i,
                blocks: blocks
            });
        }
        for ( i in blockList.dragBlocks.groups ) {
            blocks = [];
            for ( j in blockList.dragBlocks.groups[i] ) {
                blocks.push(
                    blockList.dragBlocks.groups[i][j].getTemplateData()
                );
            }
            context.dragColGroups.push({
                title: i,
                blocks: blocks
            });
        }

        // Render template
        template = $(
            views['editorPanel'](context)
        );

        // Find and keep DOM elements
        this.$editor = template;
        this.$paintCol = $('.editor-panel--paint-col', template);
        this.$dragCol = $('.editor-panel--drag-col', template);

        // Display template
        template.appendTo('body');
    };

    // Initialization
    this.init();
};
