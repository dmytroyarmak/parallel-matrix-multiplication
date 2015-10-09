(function() {
  'use strict';

  var outputNode = document.getElementById('output');
  var printToOutputNode = function(text) {
    outputNode.textContent += '\n' + text;
  };

  var bench = new Benchmark('Matrix multiplication (size: 1000)', {
    async: true,
    setup: function() {
      var SIZE = 1000;
      var matrixA = new Float64Array(SIZE * SIZE);
      var matrixB = new Float64Array(SIZE * SIZE);
      var result = new Float64Array(SIZE * SIZE);
      MatrixMultiplication.fillWithRandomValues(matrixA);
      MatrixMultiplication.fillWithRandomValues(matrixB);
    },
    fn: function() {
      MatrixMultiplication.product(matrixA, matrixB, result, SIZE);
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
