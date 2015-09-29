(function(root) {
  'use strict';

  var ParallelMatrixMultiplication = {
    productParallel: productParallel
  };

  var workers;
  var n = 4;

  function productParallel (buffer, size) {
    initWorker();
    return Promise.all(workers.map(function(worker, p) {
      return new Promise(function(resolve, reject) {
        worker.onmessage = function(e) {
          resolve(e.data);
        };

        worker.onerror = function(e) {
          reject(e);
        };

        worker.postMessage({
          p: p,
          n: n,
          buffer: buffer,
          size: size
        });
      });
    })).then(function(resultChunks) {
      var matrixSize = size * size;
      var resultChunkSize = matrixSize / n;
      var result = new Float64Array(buffer, matrixSize * 2 * Float64Array.BYTES_PER_ELEMENT, matrixSize);

      resultChunks.forEach(function(resultChunk, p) {
        result.set(resultChunk, resultChunkSize * p);
      });

      return buffer;
    });
  }

  function initWorker () {
    var i;
    if (!workers) {
      workers = new Array(n);
      for (i = 0; i < n; i += 1) {
        workers[i] = new Worker('/src/parallel-matrix-multiplication-worker.js');
      }
    }
  }

  root.ParallelMatrixMultiplication = ParallelMatrixMultiplication;
}(this));
