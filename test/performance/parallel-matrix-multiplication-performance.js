(function() {
  'use strict';

  var outputNode = document.getElementById('output');
  var printToOutputNode = function(text) {
    outputNode.textContent += '\n' + text;
  };

  var bench = new Benchmark('Matrix multiplication (100x100)', {
    async: true,
    setup: function() {
      var matrixA = ParallelMatrixMultiplication.generate(100);
      var matrixB = ParallelMatrixMultiplication.generate(100);
    },
    fn: function() {
      ParallelMatrixMultiplication.product(matrixA, matrixB, 100);
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
