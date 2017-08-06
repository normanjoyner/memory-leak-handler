# memory-leak-handler
Handle high memory utilization in nodejs by killing the process

## Is this a good idea?
Of course

## Are you sure?
Of course

## Okay, can you show me how to use it?
Of course
```javascript
const MemoryLeakHandler = require('memory-leak-handler');
const leak_handler = new MemoryLeakHandler({
    max_rss: 32,
    exit: (callback) => {
        // clean up some things before the process is killed
        return callback();
    }
});
```

## Features
* Ready for prod
