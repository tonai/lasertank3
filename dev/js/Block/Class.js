/**
 * Base class
 *
 * @author Tony Cabaye
 * @version svn : $Id$
 */
var $ = require('jquery');
module.exports = (function() {
    var fnTest = /xyz/.test( function(){'xyz';} ) ? /\bparent\b/ : /.*/;

    function create(prototype) {
        function Class() {
            if ( typeof this.init == 'function' ) {
                this.init.apply(this, arguments);
            }
        }

        for ( var i in prototype ) {
            Class.prototype[i] = prototype[i];
        }

        Class.extends = function(Class) {
            if ( typeof Class != 'undefined' && typeof Class.constructor == 'function' )
            {
                var name;
                var parent = Class.prototype;
                var prototype = Object.create( Class.prototype );
                var extendMethod = function(name, fn){
                    return function() {
                        var tmp = this.parent;
                        this.parent = parent[name];
                        var ret = fn.apply(this, arguments);
                        this.parent = tmp;
                        return ret;
                    };
                };

                for ( name in prototype ) {
                    if ( typeof prototype[name] == 'function' &&
                         typeof this.prototype[name] == 'function' &&
                         fnTest.test(this.prototype[name]) ) {
                        this.prototype[name] = extendMethod(name, this.prototype[name]);
                    } else if( typeof prototype[name] == 'object' && typeof this.prototype[name] == 'object' ) {
                        $.extend(this.prototype[name], prototype[name]);
                    } else if( typeof this.prototype[name] == 'undefined' ) {
                        this.prototype[name] = prototype[name];
                    }
                }
            }
        };

        Class.prototype.constructor = Class;
        return Class;
    }

    return {
        create: create
    };
})();
