(function() {
  'use strict';

  var outputNode = document.getElementById('output');
  var printToOutputNode = function(text) {
    outputNode.textContent += '\n' + text;
  };

  var bench = new Benchmark('Parallel matrix multiplication (size: 1000)', {
    async: true,
    defer: true,
    setup: function() {
      var matrixA = MatrixMultiplication.generate(1000);
      var matrixB = MatrixMultiplication.generate(1000);
    },
    fn: function(deferred) {
      ParallelMatrixMultiplication.productParallel(matrixA, matrixB, 1000).then(function() {
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
}());
