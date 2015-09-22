(function(root) {
  'use strict';

  var MatrixMultiplication = {
    product: product,
    generate: generate
  };

  function product (matrixA, matrixB, size, p, n) {
    p = p || 0;
    n = n || 1;
    var i, j, k;
    var iStart = p * size / n;
    var iEnd = (p + 1) * size / n;
    var result = new Float64Array((size * size) / n);
    var resultCell;

    for (i = iStart; i < iEnd; i += 1) {
      for (j = 0; j < size; j += 1) {
        resultCell = 0;
        for (k = 0; k < size; k += 1) {
          resultCell += matrixA[i * size + k] * matrixB[k * size + j];
        }
        result[(i - iStart) * size + j] = resultCell;
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

  root.MatrixMultiplication = MatrixMultiplication;
}(this));
