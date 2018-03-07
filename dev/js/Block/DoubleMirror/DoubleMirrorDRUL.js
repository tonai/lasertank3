/**
 * Double mirror down-right & up-left block class
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
    className: 'DoubleMirrorDRUL',

    /**
     * Id of the block
     *
     * @public
     */
    id: 48,

    /**
     * Group for the block
     *
     * @public
     */
    toolGroup: 'Double mirrors',

    /**
     * Direction cross-reference table
     *
     * @public
     */
    fireDirections: {
        37: 40,
        38: 39,
        39: 38,
        40: 37
    }
});
