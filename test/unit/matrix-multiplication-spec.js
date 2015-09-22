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

      beforeEach(function() {
        matrixA = Float64Array.from([
           1,  2,  3,  4,
           5,  6,  7,  8,
           9, 10, 11, 12,
          13, 14, 15, 16
        ]);
        matrixB = Float64Array.from([
          17, 18, 19, 20,
          21, 22, 23, 24,
          25, 26, 27, 28,
          29, 30, 31, 32
        ]);
      });

      it('calculate product when n = p and n < m', function() {
        var result = window.MatrixMultiplication.product(matrixA, matrixB, 4);
        expect(result).toEqual(jasmine.any(Float64Array));
        expect(result.length).toBe(16);
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
        var result = window.MatrixMultiplication.product(matrixA, matrixB, 4, 0, 4);
        expect(result).toEqual(jasmine.any(Float64Array));
        expect(result.length).toBe(4);
        expect(result[0]).toBe(250);
        expect(result[1]).toBe(260);
        expect(result[2]).toBe(270);
        expect(result[3]).toBe(280);
      });

      it('calculate product for 2 of 4', function() {
        var result = window.MatrixMultiplication.product(matrixA, matrixB, 4, 1, 4);
        expect(result).toEqual(jasmine.any(Float64Array));
        expect(result.length).toBe(4);
        expect(result[0]).toBe(618);
        expect(result[1]).toBe(644);
        expect(result[2]).toBe(670);
        expect(result[3]).toBe(696);
      });

      it('calculate product for 3 of 4', function() {
        var result = window.MatrixMultiplication.product(matrixA, matrixB, 4, 2, 4);
        expect(result).toEqual(jasmine.any(Float64Array));
        expect(result.length).toBe(4);
        expect(result[0]).toBe(986);
        expect(result[1]).toBe(1028);
        expect(result[2]).toBe(1070);
        expect(result[3]).toBe(1112);
      });

      it('calculate product for 4 of 4', function() {
        var result = window.MatrixMultiplication.product(matrixA, matrixB, 4, 3, 4);
        expect(result).toEqual(jasmine.any(Float64Array));
        expect(result.length).toBe(4);
        expect(result[0]).toBe(1354);
        expect(result[1]).toBe(1412);
        expect(result[2]).toBe(1470);
        expect(result[3]).toBe(1528);
      });
    });
  });

  describe('generate', function() {
    it('is a function', function() {
      expect(window.MatrixMultiplication.generate).toEqual(jasmine.any(Function));
    });

    it('returns matrix that has passed size and random values', function () {
      var result = window.MatrixMultiplication.generate(3);
      expect(result).toEqual(jasmine.any(Float64Array));
      expect(result.length).toBe(9);
    });
  });
});
