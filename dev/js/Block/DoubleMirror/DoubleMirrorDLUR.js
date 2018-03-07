/**
 * Double mirror down-left & up-right block class
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
    className: 'DoubleMirrorDLUR',

    /**
     * Id of the block
     *
     * @public
     */
    id: 49,

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
        37: 38,
        38: 37,
        39: 40,
        40: 39
    }
});
