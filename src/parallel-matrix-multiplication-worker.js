importScripts('../parlib-simple/src/asymmetric-barrier.js', '../parlib-simple/src/marshaler.js', '../parlib-simple/src/par.js', 'matrix-multiplication.js');

var parJs = new WorkerPar();
onmessage = function(e) {
  if (!parJs.dispatch(e.data)) {
      console.log("Unknown: " + e.data);
  }
};

function productChunk (fromRow, toRow, matrixA, matrixB, result, size) {
  MatrixMultiplication.product(matrixA, matrixB, result, size, fromRow, toRow);
}
