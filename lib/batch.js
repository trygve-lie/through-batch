"use strict";

const stream = require('readable-stream');



const Batch = (size, transform) => {

    let buffer = [];

    return new stream.Transform({
        objectMode : true,

        transform: function (obj, encoding, next) {

            if (transform) {
                obj = transform(obj);
            }

            buffer.push(obj);

            if (buffer.length === size) {
                this.push(buffer);
                buffer = [];
            }

            next();
        },

        flush: function (done) {
            if (buffer.length > 0) {
              this.push(buffer);
            }

            done();
        }

    });

}


module.exports = Batch;
