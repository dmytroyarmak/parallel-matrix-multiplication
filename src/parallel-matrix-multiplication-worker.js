importScripts('matrix-multiplication.js');

onmessage = function(e) {
  var matrixA = e.data.matrixA;
  var matrixB = e.data.matrixB;
  var size = e.data.size;
  var result = MatrixMultiplication.product(matrixA, matrixB, size);
  postMessage(result);
};
