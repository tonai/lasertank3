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
    className: 'RotatingMirrorUL',

    /**
     * Id of the block
     *
     * @public
     */
    id: 51,

    /**
     * Direction cross-reference table
     *
     * @public
     */
    fireDirections: {
        39: 38,
        40: 37
    },

    /**
     * The new Id of the block after the rotation
     *
     * @public
     */
    rotationId: 52
});
