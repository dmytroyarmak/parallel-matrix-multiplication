importScripts('matrix-multiplication.js');

onmessage = function(e) {
  var matrixA = e.data.matrixA;
  var matrixB = e.data.matrixB;
  var size = e.data.size;
  var p = e.data.p;
  var n = e.data.n;
  var result = new Float64Array((size * size) / n);
  MatrixMultiplication.product(matrixA, matrixB, result, size, p, n);
  postMessage(result);
};
