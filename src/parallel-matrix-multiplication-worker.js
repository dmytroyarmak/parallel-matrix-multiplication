importScripts('matrix-multiplication.js');

onmessage = function(e) {
  var buffer = e.data.buffer;
  var size = e.data.size;
  var p = e.data.p;
  var n = e.data.n;
  MatrixMultiplication.product(buffer, size, p, n);
  postMessage('DONE');
};
