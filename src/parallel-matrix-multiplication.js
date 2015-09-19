(function(window) {
	'use strict';

	var ParallelMatrixMultiplication = {
		product: product,
    generate: generate
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
