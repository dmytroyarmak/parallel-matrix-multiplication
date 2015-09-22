(function(root) {
  'use strict';

  var ParallelMatrixMultiplication = {
    productParallel: productParallel
  };

  var worker;

  function productParallel (matrixA, matrixB, size) {
    initWorker();
    return new Promise(function(resolve, reject) {

      worker.onmessage = function(e) {
        resolve(e.data);
      };

      worker.onerror = function(e) {
        reject(e);
      };

      worker.postMessage({
        matrixA: matrixA,
        matrixB: matrixB,
        size: size
      });
    });
  }

  function initWorker () {
    if (!worker) {
      worker = new Worker('/src/parallel-matrix-multiplication-worker.js');
    }
  }

  root.ParallelMatrixMultiplication = ParallelMatrixMultiplication;
}(this));
