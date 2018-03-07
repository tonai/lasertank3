/**
 * Enemy up block class
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
    className: 'EnemyUp',

    /**
     * Id of the block
     *
     * @public
     */
    id: 72,

    /**
     * Direction of the block
     *
     * @public
     */
    direction: 38,

    /**
     * Id of the associated broken block
     *
     * @public
     */
    brokenId: 76
});
