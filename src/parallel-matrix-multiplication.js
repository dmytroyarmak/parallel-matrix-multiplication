(function(root) {
  'use strict';
  var maxMatrixSize = 1000 * 1000;
  var bytesForAllMatrices = maxMatrixSize * 3 * SharedFloat64Array.BYTES_PER_ELEMENT;
  var rawMemory = new SharedArrayBuffer(bytesForAllMatrices + MasterPar.NUMINTS * 4);
  var parJsMemory = new SharedInt32Array(rawMemory, bytesForAllMatrices, MasterPar.NUMINTS);
  var numberOfWorkers = 4;
  var initParJsPromise;

  function productParallel (matrixA, matrixB, size) {
    var result = new SharedFloat64Array(rawMemory, matrixA.byteLength + matrixB.byteLength, size * size);

    return initParJs()
      .then(function(parJs) {
        return invokeProductChunk(parJs, matrixA, matrixB, result, size);
      });
  }

  function init () {
    return initParJs().then(function() {});
  }

  function initParJs () {
    initParJsPromise = initParJsPromise || new Promise(function(resolve) {
      var parJs = new MasterPar(parJsMemory, 0, numberOfWorkers, '/src/parallel-matrix-multiplication-worker.js', function() {
        resolve(parJs);
      });
    });

    return initParJsPromise;
  }

  function invokeProductChunk (parJs, matrixA, matrixB, result, size) {
    return new Promise(function(resolve) {
      parJs.invoke(function() {
        resolve(result);
      }, 'productChunk', [[0, size]], matrixA, matrixB, result, size);
    });
  }

  function alloc (size) {
    var matrixA = new SharedFloat64Array(rawMemory, 0, size * size);
    var matrixB = new SharedFloat64Array(rawMemory, matrixA.byteLength, size * size);
    return [matrixA, matrixB];
  }

  var ParallelMatrixMultiplication = {
    productParallel: productParallel,
    init: init,
    alloc: alloc
  };

  root.ParallelMatrixMultiplication = ParallelMatrixMultiplication;
}(this));
