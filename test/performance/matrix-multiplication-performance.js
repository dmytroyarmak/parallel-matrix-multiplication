(function() {
  'use strict';

  var outputNode = document.getElementById('output');
  var printToOutputNode = function(text) {
    outputNode.textContent += '\n' + text;
  };

  var bench = new Benchmark('Matrix multiplication (size: 100)', {
    async: true,
    setup: function() {
      var matrixA = MatrixMultiplication.generate(100);
      var matrixB = MatrixMultiplication.generate(100);
    },
    fn: function() {
      MatrixMultiplication.product(matrixA, matrixB, 100);
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
