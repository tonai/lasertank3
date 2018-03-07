/**
 * Movable enemy down block class
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
    className: 'MovableEnemyDown',

    /**
     * Id of the block
     *
     * @public
     */
    id: 80,

    /**
     * Direction of the block
     *
     * @public
     */
    direction: 40,

    /**
     * Id of the associated broken block
     *
     * @public
     */
    brokenId: 84
});
