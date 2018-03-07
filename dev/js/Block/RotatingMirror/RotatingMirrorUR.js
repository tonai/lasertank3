/**
 * Rotating mirror up-left block class
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
    className: 'RotatingMirrorUR',

    /**
     * Id of the block
     *
     * @public
     */
    id: 52,

    /**
     * Direction cross-reference table
     *
     * @public
     */
    fireDirections: {
        37: 38,
        40: 39
    },

    /**
     * The new Id of the block after the rotation
     *
     * @public
     */
    rotationId: 53
});
