function MemoryLeakHandler(options){
    if(!options)
        options = {};

    options.max_rss = options.max_rss || 128;

    if(options.exit && typeof options.exit == "function")
        options.exit = options.exit;
    else{
        options.exit = function(fn){
            return fn();
        }
    }

    setInterval(function(){
        var rss = process.memoryUsage().rss / (1024 * 1024);
        if(rss > options.max_rss){
            options.exit(function(){
                process.exit(1);
            });
        }
    }, 1000);
}

module.exports = MemoryLeakHandler;
