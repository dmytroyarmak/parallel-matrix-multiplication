(function(window) {
	'use strict';

	var ParallelMatrixMultiplication = {
		product: product
	};

	function product (matrixA, matrixB) {
		var matrixARows = _getNumberOfRows(matrixA);
		var matrixACols = _getNumberOfCols(matrixA);
		var matrixBRows = _getNumberOfRows(matrixB);
		var matrixBCols = _getNumberOfCols(matrixB);
		var result = _createMatrix(matrixARows, matrixBCols);
		var matrixARow;
		var matrixBCol;
		var resultCell;
		var i;
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

	function _getNumberOfRows (matrix) {
		return matrix.length;
	}

	function _getNumberOfCols (matrix) {
		return matrix[0].length;
	}

	function _createMatrix (rows, cols) {
		return new Array(rows).fill(null).map(function() {
			return new Array(cols).fill(null);
		});
	}

	window.ParallelMatrixMultiplication = ParallelMatrixMultiplication;
}(window));