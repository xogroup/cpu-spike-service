'use strict';

const Hapi = require('hapi');
const usage = require('usage');
const fibo = require('./lib/fibo');

let cpuDesired = 0, 
    cpuReal = 0;

const   cpuHistory = [0,0,0],
        workers = [],
        decrementDelay = [],
        options = { keepHistory: true },
        average = arr => arr.reduce( ( p, c ) => p + c, 0 ) / arr.length,
        server = new Hapi.Server();

const setCPUHandler = function (request, reply) {

    const input = request.query['cpu'];

    if (input >= 0 && input <= 100) {
        cpuDesired = input;
        return reply('ok');
    }

    return reply('bad');
};

// CPU Poller
setInterval(() => {
    usage.lookup(process.pid, options, (err, result) => {
        cpuHistory.shift();
        cpuHistory.push(result.cpu);
        cpuReal = average(cpuHistory);
    });
}, 500);

// Work Scheduler
setInterval(() => {
    if(cpuReal <= 100 && cpuDesired > cpuReal) {
        console.log('incrementing');
        workers.push(setInterval(() => fibo(100000), 10));
    } else if(cpuReal >= 0 && workers.length > 0 && cpuDesired < cpuReal) {
        if (!decrementDelay.length > 0) {
            console.log('decrementing');
            decrementDelay.unshift(0,0,0);
            clearInterval(workers.shift());
        } else {
            decrementDelay.shift();
        }
    }

    console.log(`desired ${cpuDesired} real ${cpuReal} workers ${workers.length}`)
}, 500);

server.connection({ 
    host: 'localhost', 
    port: 8000 
});

// Add the route
server.route({
    method: 'GET',
    path:'/set-cpu', 
    handler: setCPUHandler
});

// Start the server
server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});

