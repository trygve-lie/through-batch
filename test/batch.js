"use strict";

const   stream  = require('stream'),
        tap     = require('tap'),
        batch   = require('../');


const sourceStream = (arr) => {
    return new stream.Readable({
        objectMode : true,
        read: function (n) {
            arr.forEach((el) => {
                this.push(el);
            });
            this.push(null);
        }
    });
}


const sourceArray = [
    {id:0},
    {id:1},
    {id:2},
    {id:3},
    {id:4},
    {id:5},
    {id:6},
    {id:7},
    {id:8},
    {id:9}
];



tap.test('source array with 10 objects, batching size is 4 - result should write 3 arrays', (t) => {

    var count = 0;

    sourceStream(sourceArray)
        .pipe(batch(4))
        .pipe(new stream.Writable({
            objectMode : true,
            write: function(chunk, encoding, next) {

                if (count === 2) {
                    t.equal(chunk.length, 2);
                    t.end();
                    return;
                } 

                t.equal(chunk.length, 4);
                count++;
                next()
            }
        }));

});



tap.test('source array with 10 objects, batching size is 4 - result should write 3 arrays', (t) => {

    var count = 0;

    sourceStream(sourceArray)
        .pipe(batch(4))
        .pipe(new stream.Writable({
            objectMode : true,
            write: function(chunk, encoding, next) {

                if (count === 2) {
                    t.equal(chunk.length, 2);
                    t.end();
                    return;
                } 

                t.equal(chunk.length, 4);
                count++;
                next()
            }
        }));

});



tap.test('transform function appended - result should be transformed', (t) => {

    var count = 0;

    sourceStream(sourceArray)
        .pipe(batch(1, (obj) => {
            return {uuid : obj.id};
        }))
        .pipe(new stream.Writable({
            objectMode : true,
            write: function(chunk, encoding, next) {

                t.similar(chunk, [{uuid : sourceArray[count].id}]);

                if (count === 9) {
                    t.end();
                    return;
                } 

                count++;
                next()
            }
        }));

});
