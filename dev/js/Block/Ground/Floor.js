/**
 * Floor block class
 *
 * @author Tony Cabaye
 * @version svn : $Id$
 * @constructor
 * @param {number} i : column position initialization
 * @param {number} j : line position initialization
 */
var $ = require('jquery');
var Class = require('../Class.js');
module.exports = Class.create({
    /**
     * Class name
     *
     * @public
     */
    className: 'Floor',

    /**
     * Id of the block
     *
     * @public
     */
    id: 0,

    /**
     * Group for the block
     *
     * @public
     */
    toolGroup: 'Grounds',

    /**
     * Can an other block move over this block ?
     *
     * @public
     * @param {Game} game : Game object
     * @returns {Boolean}
     */
    canMoveOver: function(game) {
        return true;
    },

    /**
     * Can a fire shot pass through the block ?
     * (without being stopped or transformed...etc.)
     *
     * @public
     * @returns {Boolean}
     */
    canFireThrough: function() {
        return true;
    }
});
