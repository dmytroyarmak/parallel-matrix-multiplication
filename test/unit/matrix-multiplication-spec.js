describe('MatrixMultiplication', function() {
  it('is defined on global scope', function() {
    expect(window.MatrixMultiplication).toEqual(jasmine.any(Object));
  });

  describe('product', function() {
    it('is a function', function() {
      expect(window.MatrixMultiplication.product).toEqual(jasmine.any(Function));
    });

    describe('for matrices nxm and mxp', function() {
      it('calculate product when n = p and n < m', function() {
        var matrixA = Float64Array.from([
          1, 2, 3,
          4, 5, 6,
          7, 8, 9
        ]);
        var matrixB = Float64Array.from([
          10, 11, 12,
          13, 14, 15,
          16, 17, 18
        ]);
        var result = window.MatrixMultiplication.product(matrixA, matrixB, 3);
        expect(result).toEqual(jasmine.any(Float64Array));
        expect(result.length).toBe(9);
        expect(result[0]).toBe(84);
        expect(result[1]).toBe(90);
        expect(result[2]).toBe(96);
        expect(result[3]).toBe(201);
        expect(result[4]).toBe(216);
        expect(result[5]).toBe(231);
        expect(result[6]).toBe(318);
        expect(result[7]).toBe(342);
        expect(result[8]).toBe(366);
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
