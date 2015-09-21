(function(window) {
  'use strict';

  var ParallelMatrixMultiplication = {
    product: product,
    generate: generate
  };

  function product (matrixA, matrixB, size) {
    var i, j, k;
    var result = new Float64Array(size * size);
    var resultCell;

    for (i = 0; i < size; i += 1) {
      for (j = 0; j < size; j += 1) {
        resultCell = 0;
        for (k = 0; k < size; k += 1) {
          resultCell += matrixA[i * size + k] * matrixB[k * size + j];
        }
        result[i * size + j] = resultCell;
      }
    }

    return result;
  }

  function generate (size) {
    var numberOfValues = size * size;
    var matrix = new Float64Array(numberOfValues);
    var i;

    for(i = 0; i < numberOfValues; i += 1) {
      matrix[i] = Math.random();
    }

    return matrix;
  }

  window.ParallelMatrixMultiplication = ParallelMatrixMultiplication;
}(window));
