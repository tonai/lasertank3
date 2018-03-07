/**
 * Rotating mirror down-left block class
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
    className: 'RotatingMirrorDL',

    /**
     * Id of the block
     *
     * @public
     */
    id: 50,

    /**
     * Direction cross-reference table
     *
     * @public
     */
    fireDirections: {
        38: 37,
        39: 40
    },

    /**
     * The new Id of the block after the rotation
     *
     * @public
     */
    rotationId: 51
});
