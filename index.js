'use strict';

class MemoryLeakHandler {

    constructor(options) {
        if(!options) {
            options = {};
        }

        if(options.autostart === undefined) {
            options.autostart = true;
        }

        this.max_rss = options.max_rss || 128;
        this.check_interval = options.check_interval || 1000;

        if(options.on_exit && typeof options.on_exit === 'function') {
            this.on_exit = options.on_exit;
        }

        if(options.autostart) {
            this.start();
        }
    }

    start() {
        this.interval = setInterval(() => {
            const rss = process.memoryUsage().rss / (1024 * 1024);
            if(rss > this.max_rss) {
                this.on_exit(() => {
                    process.exit(1);
                });
            }
        }, this.check_interval);
    }

    stop() {
        clearInterval(this.interval);
    }

    on_exit(callback) {
        return callback();
    }

}

module.exports = MemoryLeakHandler;
