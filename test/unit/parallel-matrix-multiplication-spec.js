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
        var matrixA = window.ParallelMatrixMultiplication.createArrayBufferFromMatrix([
          [1, 2, 3],
          [4, 5, 6]
        ]);
        var matrixB = window.ParallelMatrixMultiplication.createArrayBufferFromMatrix([
          [7, 8],
          [9, 10],
          [11, 12]
        ]);
        var result = window.ParallelMatrixMultiplication.product(matrixA, matrixB);
        var size = new Uint32Array(result, 0, 2);
        var values = new Float64Array(result, 8, 4);
        expect(size[0]).toBe(2);
        expect(size[1]).toBe(2);
        expect(values[0]).toBe(58);
        expect(values[1]).toBe(64);
        expect(values[2]).toBe(139);
        expect(values[3]).toBe(154);
      });

      it('calculate product when n != p, n < m and m < p', function() {
        var matrixA = window.ParallelMatrixMultiplication.createArrayBufferFromMatrix([
          [1, 2, 3],
          [4, 5, 6]
        ]);
        var matrixB = window.ParallelMatrixMultiplication.createArrayBufferFromMatrix([
          [ 7,  8,  9, 10],
          [11, 12, 13, 14],
          [15, 16, 17, 18]
        ]);
        var expectedResult = window.ParallelMatrixMultiplication.createArrayBufferFromMatrix([
          [ 74,  80,  86,  92],
          [173, 188, 203, 218]
        ]);
        var result = window.ParallelMatrixMultiplication.product(matrixA, matrixB);
        var size = new Uint32Array(result, 0, 2);
        var values = new Float64Array(result, 8, 8);
        expect(size[0]).toBe(2);
        expect(size[1]).toBe(4);
        expect(values[0]).toBe(74);
        expect(values[1]).toBe(80);
        expect(values[2]).toBe(86);
        expect(values[3]).toBe(92);
        expect(values[4]).toBe(173);
        expect(values[5]).toBe(188);
        expect(values[6]).toBe(203);
        expect(values[7]).toBe(218);
      });

      it('throws error when columns of matrix A does not match rows of matrix B', function() {
        var matrixA = window.ParallelMatrixMultiplication.createArrayBufferFromMatrix([[1, 2], [3, 4]]);
        var matrixB = window.ParallelMatrixMultiplication.createArrayBufferFromMatrix([[7, 8], [9, 10], [11, 12]]);
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
      var size = new Uint32Array(matrix, 0, 2);
      var values = new Float64Array(matrix, 8, 24);
      expect(matrix.byteLength).toBe(Uint32Array.BYTES_PER_ELEMENT * 2 + Float64Array.BYTES_PER_ELEMENT * 24);
      expect(size[0]).toBe(4);
      expect(size[1]).toBe(6);
    });
  });

  describe('createArrayBufferFromMatrix', function() {
    it('is a function', function() {
      expect(window.ParallelMatrixMultiplication.createArrayBufferFromMatrix).toEqual(jasmine.any(Function));
    });

    describe('for matrix [[7, 8], [9, 10], [11, 12]]', function() {
      var result;

      beforeEach(function() {
        result = window.ParallelMatrixMultiplication.createArrayBufferFromMatrix([[7, 8], [9, 10], [11, 12]]);
      });

      it('returns ArrayBuffer', function() {
        expect(result).toEqual(jasmine.any(ArrayBuffer));
      });

      it('returns ArrayBuffer with correct length', function() {
        expect(result.byteLength).toBe(Uint32Array.BYTES_PER_ELEMENT * 2 + Float64Array.BYTES_PER_ELEMENT*6);
      });

      it('returns ArrayBuffer with correct rows', function() {
        var size = new Uint32Array(result, 0, 2);
        expect(size[0]).toBe(3);
      });

      it('returns ArrayBuffer with correct cols', function() {
        var size = new Uint32Array(result, 0, 2);
        expect(size[1]).toBe(2);
      });

      it('returns ArrayBuffer with correct values', function() {
        var values = new Float64Array(result, 8, 6);
        expect(values[0]).toBe(7);
        expect(values[1]).toBe(8);
        expect(values[2]).toBe(9);
        expect(values[3]).toBe(10);
        expect(values[4]).toBe(11);
        expect(values[5]).toBe(12);
      });
    });
  });
});
