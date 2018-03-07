/**
 * Rotating mirror down-right block class
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
    className: 'RotatingMirrorDR',

    /**
     * Id of the block
     *
     * @public
     */
    id: 53,

    /**
     * Direction cross-reference table
     *
     * @public
     */
    fireDirections: {
        37: 40,
        38: 39
    },

    /**
     * The new Id of the block after the rotation
     *
     * @public
     */
    rotationId: 50
});
