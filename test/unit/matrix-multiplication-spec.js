describe('MatrixMultiplication', function() {
  it('is defined on global scope', function() {
    expect(window.MatrixMultiplication).toEqual(jasmine.any(Object));
  });

  describe('product', function() {
    it('is a function', function() {
      expect(window.MatrixMultiplication.product).toEqual(jasmine.any(Function));
    });

    describe('for matrices nxm and mxp', function() {
      var matrixA;
      var matrixB;
      var result;

      beforeEach(function() {
        matrixA = new Float64Array(16);
        matrixA.set([
           1,  2,  3,  4,
           5,  6,  7,  8,
           9, 10, 11, 12,
          13, 14, 15, 16
        ]);

        matrixB = new Float64Array(16);
        matrixB.set([
          17, 18, 19, 20,
          21, 22, 23, 24,
          25, 26, 27, 28,
          29, 30, 31, 32
        ]);

        result = new Float64Array(16);
      });

      it('calculate product when n = p and n < m', function() {
        window.MatrixMultiplication.product(matrixA, matrixB, result, 4);
        expect(result[0]).toBe(250);
        expect(result[1]).toBe(260);
        expect(result[2]).toBe(270);
        expect(result[3]).toBe(280);
        expect(result[4]).toBe(618);
        expect(result[5]).toBe(644);
        expect(result[6]).toBe(670);
        expect(result[7]).toBe(696);
        expect(result[8]).toBe(986);
        expect(result[9]).toBe(1028);
        expect(result[10]).toBe(1070);
        expect(result[11]).toBe(1112);
        expect(result[12]).toBe(1354);
        expect(result[13]).toBe(1412);
        expect(result[14]).toBe(1470);
        expect(result[15]).toBe(1528);
      });

      it('calculate product for 1 of 4', function() {
        window.MatrixMultiplication.product(matrixA, matrixB, result, 4, 0, 1);
        expect(result[0]).toBe(250);
        expect(result[1]).toBe(260);
        expect(result[2]).toBe(270);
        expect(result[3]).toBe(280);
        expect(result[4]).toBe(0);
        expect(result[5]).toBe(0);
        expect(result[6]).toBe(0);
        expect(result[7]).toBe(0);
        expect(result[8]).toBe(0);
        expect(result[9]).toBe(0);
        expect(result[10]).toBe(0);
        expect(result[11]).toBe(0);
        expect(result[12]).toBe(0);
        expect(result[13]).toBe(0);
        expect(result[14]).toBe(0);
        expect(result[15]).toBe(0);
      });

      it('calculate product for 2 of 4', function() {
        window.MatrixMultiplication.product(matrixA, matrixB, result, 4, 1, 2);
        expect(result[0]).toBe(0);
        expect(result[1]).toBe(0);
        expect(result[2]).toBe(0);
        expect(result[3]).toBe(0);
        expect(result[4]).toBe(618);
        expect(result[5]).toBe(644);
        expect(result[6]).toBe(670);
        expect(result[7]).toBe(696);
        expect(result[8]).toBe(0);
        expect(result[9]).toBe(0);
        expect(result[10]).toBe(0);
        expect(result[11]).toBe(0);
        expect(result[12]).toBe(0);
        expect(result[13]).toBe(0);
        expect(result[14]).toBe(0);
        expect(result[15]).toBe(0);
      });

      it('calculate product for 3 of 4', function() {
        window.MatrixMultiplication.product(matrixA, matrixB, result, 4, 2, 3);
        expect(result[0]).toBe(0);
        expect(result[1]).toBe(0);
        expect(result[2]).toBe(0);
        expect(result[3]).toBe(0);
        expect(result[4]).toBe(0);
        expect(result[5]).toBe(0);
        expect(result[6]).toBe(0);
        expect(result[7]).toBe(0);
        expect(result[8]).toBe(986);
        expect(result[9]).toBe(1028);
        expect(result[10]).toBe(1070);
        expect(result[11]).toBe(1112);
        expect(result[12]).toBe(0);
        expect(result[13]).toBe(0);
        expect(result[14]).toBe(0);
        expect(result[15]).toBe(0);
      });

      it('calculate product for 4 of 4', function() {
        window.MatrixMultiplication.product(matrixA, matrixB, result, 4, 3, 4);
        expect(result[0]).toBe(0);
        expect(result[1]).toBe(0);
        expect(result[2]).toBe(0);
        expect(result[3]).toBe(0);
        expect(result[4]).toBe(0);
        expect(result[5]).toBe(0);
        expect(result[6]).toBe(0);
        expect(result[7]).toBe(0);
        expect(result[8]).toBe(0);
        expect(result[9]).toBe(0);
        expect(result[10]).toBe(0);
        expect(result[11]).toBe(0);
        expect(result[12]).toBe(1354);
        expect(result[13]).toBe(1412);
        expect(result[14]).toBe(1470);
        expect(result[15]).toBe(1528);
      });
    });
  });

  describe('fillWithRandomValues', function() {
    it('is a function', function() {
      expect(window.MatrixMultiplication.fillWithRandomValues).toEqual(jasmine.any(Function));
    });

    it('fill array with random values', function () {
      var matrix = new Float64Array(10);
      window.MatrixMultiplication.fillWithRandomValues(matrix);
      for (var i = 0; i < matrix.length; i += 1) {
        expect(matrix[i]).not.toBe(0);
      }
    });
  });
});
