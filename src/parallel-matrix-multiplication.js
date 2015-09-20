(function(window) {
  'use strict';

  var ParallelMatrixMultiplication = {
    product: product,
    generate: generate,
    createArrayBufferFromMatrix: createArrayBufferFromMatrix
  };

  function product (matrixA, matrixB) {
    var matrixASize = new Uint32Array(matrixA, 0 , 2);
    var matrixARows = matrixASize[0];
    var matrixACols = matrixASize[1];
    var matrixAValues = new Float64Array(matrixA, 8 , matrixARows * matrixACols);
    var matrixBSize = new Uint32Array(matrixB, 0 , 2);
    var matrixBRows = matrixBSize[0];
    var matrixBCols = matrixBSize[1];
    var matrixBValues = new Float64Array(matrixB, 8 , matrixBRows * matrixBCols);
    var result;
    var resultSize;
    var resultValues;
    var matrixARow;
    var matrixBCol;
    var resultCell;
    var i;
    if (matrixACols !== matrixBRows) {
      throw new Error('Columns of first matrix should match rows of second matrix');
    }
    result = new ArrayBuffer(Uint32Array.BYTES_PER_ELEMENT * 2 + Float64Array.BYTES_PER_ELEMENT * matrixARows * matrixBCols);
    resultSize = new Uint32Array(result, 0 , 2);
    resultValues = new Float64Array(result, 8, matrixARows * matrixBCols);

    resultSize[0] = matrixARows;
    resultSize[1] = matrixBCols;

    for (matrixARow = 0; matrixARow < matrixARows; matrixARow += 1) {
      for (matrixBCol = 0; matrixBCol < matrixBCols; matrixBCol += 1) {
        resultCell = 0;
        for (i = 0; i < matrixACols; i += 1) {
          resultCell += matrixAValues[matrixARow * matrixACols + i] * matrixBValues[i * matrixBCols + matrixBCol];
        }
        resultValues[matrixARow * matrixBCols + matrixBCol] = resultCell;
      }
    }
    return result;
  }

  function generate (rows, cols) {
    var numberOfValues = rows * cols;
    var matrix = new ArrayBuffer(Uint32Array.BYTES_PER_ELEMENT * 2 + Float64Array.BYTES_PER_ELEMENT * numberOfValues);
    var size = new Uint32Array(matrix, 0 , 2);
    var values = new Float64Array(matrix, 8, numberOfValues);
    var i;
    size[0] = rows;
    size[1] = cols;

    for(i = 0; i < numberOfValues; i += 1) {
      values[i] = Math.random();
    }

    return matrix;
  }

  function createArrayBufferFromMatrix (matrix) {
    var rows = matrix.length;
    var cols = matrix[0].length;
    var numberOfValues = rows * cols;
    var row;
    var col;
    var bufferLength = Uint32Array.BYTES_PER_ELEMENT * 2 + Float64Array.BYTES_PER_ELEMENT * numberOfValues;
    var buffer = new ArrayBuffer(bufferLength);
    var size = new Uint32Array(buffer, 0, 2);
    var values = new Float64Array(buffer, 8, numberOfValues);
    size[0] = rows;
    size[1] = cols;

    for (row = 0; row < rows; row += 1) {
      for (col = 0; col < cols; col += 1) {
        values[row*cols + col] = matrix[row][col];
      }
    }
    return buffer;
  }

  window.ParallelMatrixMultiplication = ParallelMatrixMultiplication;
}(window));
