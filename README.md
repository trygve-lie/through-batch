# through-batch

[![Dependencies](https://img.shields.io/david/trygve-lie/through-batch.svg?style=flat-square)](https://david-dm.org/trygve-lie/through-batch)[![Build Status](http://img.shields.io/travis/trygve-lie/through-batch/master.svg?style=flat-square)](https://travis-ci.org/trygve-lie/through-batch)


Transform stream that buffer up object in the stream and pushes the buffers as 
batches further down the stream.



## Installation

```bash
$ npm install through-batch
```



## Example

Buffer up 4 objects in an object stream.

```js

const JSONStream = require('JSONStream')
      batch = require('through-batch'),
      fs = require('fs');


fs.createReadStream('objects.json')
  .pipe(JSONStream.parse('*'))
  .pipe(batch(4))
  .pipe(JSONStream.stringify())
  .pipe(fs.createWriteStream('batchedObjects.json'));
```



## Description

This module will buffer up objects in an object stream and batch of events with
the buffered up objects further down the stream.

The output of the stream will then emit arrays containing the buffered up
objects.



## API

This module have the following API:

### throughBatch(size, transform)

Creates an instance for batching.

```js
const const throughBatch = require('through-batch');
let batch = throughBatch(size, transform);
```


### size (required)

How many objects each batch should contain.


### transform

A transform function used to transform the objects that is being buffered.

```js
let batch = throughBatch(4, (obj) => {
    obj['_foo'] = 'bar';
    return obj;
});
```



## node.js compabillity

This module use some native ES6 functions only found in node.js 4.x and newer. 
This module will not function with older than 4.x versions of node.js.



## error handling

This module does not handle errors for you, so you must handle errors on 
whatever streams you pipe into this module. This is a general rule when 
programming with node.js streams: always handle errors on each and every stream. 

We recommend using [`end-of-stream`](https://npmjs.org/end-of-stream) or [`pump`](https://npmjs.org/pump) 
for writing error tolerant stream code.



## License 

The MIT License (MIT)

Copyright (c) 2015 - Trygve Lie - post@trygve-lie.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.