describe('ParallelMatrixMultiplication', function() {
  it('is defined on global scope', function() {
    expect(window.ParallelMatrixMultiplication).toEqual(jasmine.any(Object));
  });

  describe('product', function() {
  	it('is a function', function() {
  		expect(window.ParallelMatrixMultiplication.product).toEqual(jasmine.any(Function));
  	});

  	it('calculate product of matrices 2x3 and 3x2', function() {
  		var matrixA = [[1, 2, 3], [4, 5, 6]];
  		var matrixB = [[7, 8], [9, 10], [11, 12]];
  		var expectedResult = [[58, 64], [139, 154]];
  		var actualResult = window.ParallelMatrixMultiplication.product(matrixA, matrixB);
  		expect(actualResult).toEqual(expectedResult);
  	});
  });
});
