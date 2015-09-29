describe('ParallelMatrixMultiplication', function() {
  it('is defined on global scope', function() {
    expect(window.ParallelMatrixMultiplication).toEqual(jasmine.any(Object));
  });

  describe('productParallel', function() {
    it('is a function', function() {
      expect(window.ParallelMatrixMultiplication.productParallel).toEqual(jasmine.any(Function));
    });

    describe('for matrices nxm and mxp', function() {
      var resultPromise;

      beforeEach(function() {
        var matrixA = [
           1,  2,  3,  4,
           5,  6,  7,  8,
           9, 10, 11, 12,
          13, 14, 15, 16
        ];
        var matrixB = [
          17, 18, 19, 20,
          21, 22, 23, 24,
          25, 26, 27, 28,
          29, 30, 31, 32
        ];
        buffer = Float64Array.from(matrixA.concat(matrixB, new Array(16).fill(0))).buffer;
        resultPromise = window.ParallelMatrixMultiplication.productParallel(buffer, 4);
      });

      it('returns promise', function() {
        expect(resultPromise).toEqual(jasmine.any(Promise));
      });

      describe('when promise is resolved', function() {
        var result;
        beforeEach(function(done) {
          resultPromise.then(function(buffer) {
            result = new Float64Array(buffer, 32 * Float64Array.BYTES_PER_ELEMENT, 16);
            done();
          });
        });

        it('calculate product when n = p and n < m', function() {
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
      });
    });
  });
});
