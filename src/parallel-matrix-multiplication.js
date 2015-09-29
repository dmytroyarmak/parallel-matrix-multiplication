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
          buffer: buffer,
          p: p,
          n: n,
          size: size
        }, [buffer]);
      });
    })).then(function() {
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
