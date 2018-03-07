/**
 * Broken movable enemy up block class
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
    className: 'BrokenMovableEnemyUp',

    /**
     * Id of the block
     *
     * @public
     */
    id: 86,

    /**
     * Type of the block
     *
     * @public
     */
    toolType: ''
});
