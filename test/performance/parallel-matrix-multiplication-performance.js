(function() {
  'use strict';

  var outputNode = document.getElementById('output');
  var printToOutputNode = function(text) {
    outputNode.textContent += '\n' + text;
  };

  var bench = new Benchmark('Parallel matrix multiplication (size: 100)', {
    async: true,
    defer: true,
    setup: function() {
      var buffer = MatrixMultiplication.generate(100);
    },
    fn: function(deferred) {
      ParallelMatrixMultiplication.productParallel(buffer, 100).then(function() {
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
