'use strict';

var fib = function(n) {
    
        var previous = 0;
        var current = 0;
        var next = 0;
    
        for(var i = 0; i<=n; i++) {
            if (i > 1) {
                previous = current;
                current = next;
            } else if (i == 1) {
                current = 1;
            }
    
            next = previous + current;
        }
    
        return current;
    }

module.exports = fib;