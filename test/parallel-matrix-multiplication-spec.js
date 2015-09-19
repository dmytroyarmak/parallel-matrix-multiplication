describe('ParallelMatrixMultiplication', function() {
  it('is defined on global scope', function() {
    expect(window.ParallelMatrixMultiplication).toEqual(jasmine.any(Object));
  });

  describe('product', function() {
    it('is a function', function() {
      expect(window.ParallelMatrixMultiplication.product).toEqual(jasmine.any(Function));
    });

    describe('for matrices nxm and mxp', function() {
      it('calculate product when n = p and n < m', function() {
        var matrixA = [
          [1, 2, 3],
          [4, 5, 6]
        ];
        var matrixB = [
          [7, 8],
          [9, 10],
          [11, 12]
        ];
        var expectedResult = [
          [58, 64],
          [139, 154]
        ];
        var actualResult = window.ParallelMatrixMultiplication.product(matrixA, matrixB);
        expect(actualResult).toEqual(expectedResult);
      });

      it('calculate product when n != p, n < m and m < p', function() {
        var matrixA = [
          [1, 2, 3],
          [4, 5, 6]
        ];
        var matrixB = [
          [ 7,  8,  9, 10],
          [11, 12, 13, 14],
          [15, 16, 17, 18]
        ];
        var expectedResult = [
          [ 74,  80,  86,  92],
          [173, 188, 203, 218]
        ];
        var actualResult = window.ParallelMatrixMultiplication.product(matrixA, matrixB);
        expect(actualResult).toEqual(expectedResult);
      });

      it('throws error when columns of matrix A does not match rows of matrix B', function() {
        var matrixA = [[1, 2], [3, 4]];
        var matrixB = [[7, 8], [9, 10], [11, 12]];
        expect(function() {
          window.ParallelMatrixMultiplication.product(matrixA, matrixB);
        }).toThrowError('Columns of first matrix should match rows of second matrix');
      });
    });
  });

  describe('generate', function() {
    it('is a function', function() {
      expect(window.ParallelMatrixMultiplication.generate).toEqual(jasmine.any(Function));
    });

    it('returns matrix that has passed size and random values', function () {
      var matrix = window.ParallelMatrixMultiplication.generate(4, 6);
      expect(matrix.length).toBe(4);

      matrix.forEach(function(row) {
        expect(row.length).toBe(6);

        row.forEach(function(value) {
          expect(value).toEqual(jasmine.any(Number));
        });
      });
    });
  });
});
