/**
 * Broken movable enemy down block class
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
    className: 'BrokenMovableEnemyDown',

    /**
     * Id of the block
     *
     * @public
     */
    id: 84,

    /**
     * Type of the block
     *
     * @public
     */
    toolType: ''
});
