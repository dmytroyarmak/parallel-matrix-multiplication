importScripts('matrix-multiplication.js');

onmessage = function(e) {
  var buffer = e.data.buffer;
  var size = e.data.size;
  var p = e.data.p;
  var n = e.data.n;
  var matrixSize = size * size;
  var resultChunkSize = matrixSize / n;
  var resultChunkOffset = (matrixSize * 2 + resultChunkSize * p) * Float64Array.BYTES_PER_ELEMENT;
  var resultChunk = new Float64Array(buffer, resultChunkOffset, resultChunkSize);
  MatrixMultiplication.product(buffer, size, p, n);
  postMessage(resultChunk);
};
