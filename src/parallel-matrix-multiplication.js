(function(window) {
	'use strict';

	var ParallelMatrixMultiplication = {
		product: product,
    generate: generate,
    createArrayBufferFromMatrix: createArrayBufferFromMatrix
	};

	function product (matrixA, matrixB) {
		var matrixARows = _getNumberOfRows(matrixA);
		var matrixACols = _getNumberOfCols(matrixA);
		var matrixBRows = _getNumberOfRows(matrixB);
		var matrixBCols = _getNumberOfCols(matrixB);
		var result;
		var matrixARow;
		var matrixBCol;
		var resultCell;
		var i;
    if (matrixACols !== matrixBRows) {
      throw new Error('Columns of first matrix should match rows of second matrix');
    }
    result = _createMatrix(matrixARows, matrixBCols);

		for (matrixARow = 0; matrixARow < matrixARows; matrixARow += 1) {
			for (matrixBCol = 0; matrixBCol < matrixBCols; matrixBCol += 1) {
				resultCell = 0;
				for (i = 0; i < matrixACols; i += 1) {
					resultCell += matrixA[matrixARow][i] * matrixB[i][matrixBCol];
				}
				result[matrixARow][matrixBCol] = resultCell;
			}
		}
		return result;
	}

  function generate (rows, cols) {
    return _createMatrix(rows, cols, function() {
      return Math.random();
    });
  }

  function createArrayBufferFromMatrix (matrix) {
    var rows = _getNumberOfRows(matrix);
    var cols = _getNumberOfCols(matrix);
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

	function _getNumberOfRows (matrix) {
		return matrix.length;
	}

	function _getNumberOfCols (matrix) {
		return matrix[0].length;
	}

	function _createMatrix (rows, cols, valueFactory) {
		return new Array(rows).fill(null).map(function() {
			return new Array(cols).fill(null).map(function() {
        return valueFactory? valueFactory() : null;
      });
		});
	}

	window.ParallelMatrixMultiplication = ParallelMatrixMultiplication;
}(window));
