(function(root) {
  'use strict';

  var MatrixMultiplication = {
    product: product,
    fillWithRandomValues: fillWithRandomValues
  };

  function product (matrixA, matrixB, result, size, fromRow, toRow) {
    fromRow = fromRow || 0;
    toRow = toRow || size;
    var i, j, k;
    var resultCell;

    for (i = fromRow; i < toRow; i += 1) {
      for (j = 0; j < size; j += 1) {
        resultCell = 0;
        for (k = 0; k < size; k += 1) {
          resultCell += matrixA[i * size + k] * matrixB[k * size + j];
        }
        result[i * size + j] = resultCell;
      }
    }
  }

  function fillWithRandomValues (matrix) {
    var i;
    for(i = 0; i < matrix.length; i += 1) {
      matrix[i] = Math.random();
    }
  }
  root.MatrixMultiplication = MatrixMultiplication;
}(this));
