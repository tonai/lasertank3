/**
 * Movable mirror up-right block class
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
    className: 'MovableMirrorUR',

    /**
     * Id of the block
     *
     * @public
     */
    id: 62,

    /**
     * Direction cross-reference table
     *
     * @public
     */
    fireDirections: {
        37: 38,
        40: 39
    }
});
