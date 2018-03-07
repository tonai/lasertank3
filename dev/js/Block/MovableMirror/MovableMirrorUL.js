/**
 * Movable mirror up-left block class
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
    id: 61,

    /**
     * Direction cross-reference table
     *
     * @public
     */
    fireDirections: {
        39: 38,
        40: 37
    }
});
