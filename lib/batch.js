"use strict";

const stream = require('readable-stream');



const Batch = (size) => {

    let buffer = [];

    return new stream.Transform({
        objectMode : true,

        transform: function (obj, encoding, next) {

            buffer.push(obj);

            if (buffer.length === size) {
                this.push(buffer);
                buffer = [];
            }

            next();
        },

        flush: function (done) {
            this.push(buffer);
            done();
        }

    });

}


module.exports = Batch;
