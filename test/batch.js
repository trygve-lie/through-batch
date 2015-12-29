"use strict";

const   stream  = require('stream'),
        tap     = require('tap'),
        concat  = require('concat-stream'),
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


const transformStream = (fn) => {
    return new stream.Transform({
        objectMode : true,

        transform: function (obj, encoding, next) {
            fn(obj)
            this.push(obj);
            next();
        },

        flush: function (done) {
            done();
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



tap.test('compare array is empty - result should hold 3 added objects', (t) => {
    sourceStream(sourceArray).pipe(batch(4)).pipe(transformStream((arr) => {
        t.equal(arr.length, 4)
    })).pipe(concat((result) => {
        t.end();
    }));
});
