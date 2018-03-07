/**
 * Block manager class
 *
 * @author Tony Cabaye
 * @version svn : $Id$
 * @constructor
 * @param {object} blocks: JSON object containing blocks
 */
var $ = require('jquery');
var options = require('options');
module.exports = function(blocks)
{
    // Basic checks
    if ( !blocks || typeof blocks != 'object' ) {
        return false;
    }

    /**
     * Class name
     *
     * @public
     */
    this.className = 'BlockList';

    /**
     * List of block classes
     *
     * @public
     */
    this.blocks = {};

    /**
     * Object containing all paint blocks organized by groups
     *
     * @public
     */
    this.paintBlocks = {
        title: 'Paint tools',
        groups: []
    };

    /**
     * Object containing all draggable blocks organized by groups
     *
     * @public
     */
    this.dragBlocks = {
        title: 'Draggables tools',
        groups: []
    };

    /**
     * Default block for background
     *
     * @public
     */
    this.defaultBlock = null;

    // Init variables
    var img = null;
    var block = null;
    var className = '';
    for ( var i in blocks ) {
        if ( typeof blocks[i] == 'string' ) {
            className = blocks[i];
            blocks[i] = eval( blocks[i] );
            blocks[i].prototype.className = className;
        }
        block = blocks[i].prototype;

        if ( !isNaN(block.id) && block.id !== '' ) {
            this.blocks[ block.id ] = blocks[i];

            if ( block.toolType !== '' ) {
                if ( block.toolType == 'paint' ) {
                    if ( !this.paintBlocks.groups[ block.toolGroup ] ) {
                        this.paintBlocks.groups[ block.toolGroup ] = [];
                    }
                    this.paintBlocks.groups[ block.toolGroup ].push(block);
                } else if ( block.toolType == 'draggable' ) {
                    if ( !this.dragBlocks.groups[ block.toolGroup ] ) {
                        this.dragBlocks.groups[ block.toolGroup ] = [];
                    }
                    this.dragBlocks.groups[ block.toolGroup ].push(block);
                }
            }
        }
    }

    this.blocks['default'] = this.blocks[0];
};