(function() {
  'use strict';

  var outputNode = document.getElementById('output');
  var printToOutputNode = function(text) {
    outputNode.textContent += '\n' + text;
  };

  var warmUp = function() {
    var allocatedMatrices = ParallelMatrixMultiplication.alloc(100);
    var matrixA = allocatedMatrices[0];
    var matrixB = allocatedMatrices[1];
    MatrixMultiplication.fillWithRandomValues(matrixA);
    MatrixMultiplication.fillWithRandomValues(matrixB);

    return ParallelMatrixMultiplication.productParallel(matrixA, matrixB, 100).then(function() {});
  };

  warmUp().then(function() {
    var bench = new Benchmark('Parallel matrix multiplication (size: 1000)', {
      async: true,
      defer: true,
      setup: function() {
        var allocatedMatrices = ParallelMatrixMultiplication.alloc(1000);
        var matrixA = allocatedMatrices[0];
        var matrixB = allocatedMatrices[1];
        MatrixMultiplication.fillWithRandomValues(matrixA);
        MatrixMultiplication.fillWithRandomValues(matrixB);
      },
      fn: function(deferred) {
        ParallelMatrixMultiplication.productParallel(matrixA, matrixB, 1000).then(function(result) {
          deferred.resolve();
        });
      },
      onCycle:function(e) {
        printToOutputNode('onCycle: ' + String(e.target));
      },
      onComplete: function(e) {
        printToOutputNode('onComplete: ' + String(e.target));
      }
    });

    bench.run();
  });
}());
