
var cluster = require('cluster');

// Code to run if we're in the master process
if (cluster.isMaster) { //for node versions > 16.0 use isPrimary

    // Count the machine's CPUs
    var cpuCount = require('os').cpus().length;

    // Create a worker for each CPU
    for (var i = 0; i < cpuCount; i += 1) {
        cluster.fork();
    }

    // Listen for terminating workers
    cluster.on('exit', function (worker) {

        // Replace the terminated workers
        console.log('Worker ' + worker.id + ' died :(');
        cluster.fork(); //start a new child process when a child exited

    });

    // Code to run if we're in a worker process
} else {
    const PORT = process.env.NODE_ENV === "production" ? 80 : process.env.PORT || 5000;
    const app = require('./app');
    app.listen(PORT, () => {
        console.log(`Express server started on port ${PORT}....`);
    });
}

