(function(root) {
  'use strict';

  var ParallelMatrixMultiplication = {
    productParallel: productParallel
  };

  var workers;
  var n = 4;

  function productParallel (matrixA, matrixB, size) {
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
          matrixA: matrixA,
          matrixB: matrixB,
          size: size
        });
      });
    })).then(function(partsOfResult) {
      var offset = (size * size) / n;
      return partsOfResult.reduce(function(result, partOfResult, p) {
        result.set(partOfResult, offset * p);
        return result;
      }, new Float64Array(size * size));
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
