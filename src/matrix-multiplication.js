(function(root) {
  'use strict';

  var MatrixMultiplication = {
    product: product,
    productInBuffer: productInBuffer,
    generate: generate,
    generateBuffer: generateBuffer
  };

  function product (matrixA, matrixB, result, size, p, n) {
    p = p || 0;
    n = n || 1;
    var i, j, k;
    var iStart = p * size / n;
    var iEnd = (p + 1) * size / n;
    var resultCell;

    for (i = iStart; i < iEnd; i += 1) {
      for (j = 0; j < size; j += 1) {
        resultCell = 0;
        for (k = 0; k < size; k += 1) {
          resultCell += matrixA[i * size + k] * matrixB[k * size + j];
        }
        result[i * size + j] = resultCell;
      }
    }
  }

  function productInBuffer (buffer, size, p, n) {
    var matrixSize = size * size;
    var matrixA = new Float64Array(buffer, 0, matrixSize);
    var matrixB = new Float64Array(buffer, matrixA.byteLength , matrixSize);
    var result = new Float64Array(buffer, matrixA.byteLength + matrixB.byteLength, matrixSize);
    product(matrixA, matrixB, result, size, p, n);
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

  function generateBuffer (size) {
    var numberOfValuesInMatrix = size * size;
    var numberOfValuesToGenerate = numberOfValuesInMatrix * 2;
    var matrix = new Float64Array(numberOfValuesInMatrix * 3);
    var i;

    for(i = 0; i < numberOfValuesToGenerate; i += 1) {
      matrix[i] = Math.random();
    }

    return matrix.buffer;
  }
  root.MatrixMultiplication = MatrixMultiplication;
}(this));
