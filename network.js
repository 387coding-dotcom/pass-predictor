function sigmoid(z){
    return 1/(1+ Math.exp(-z));
}

let W1 = [
  [0.5, -0.3],
  [-0.4, 0.6],
  [0.2, 0.2],
  [-0.6, -0.5]
];
let b1 = [0.1, -0.1, 0.05, 0.2];

let W2 = [0.5, -0.4, 0.3, 0.6];
let b2 = 0.1;

function forward(study, sleep) {
  let hiddenOutputs = [];

  for (let j = 0; j < 4; j++) {
    let z = W1[j][0] * study + W1[j][1] * sleep + b1[j];
    hiddenOutputs[j] = sigmoid(z);
  }

  let z2 = b2;
  for (let j = 0; j < 4; j++) {
    z2 += W2[j] * hiddenOutputs[j];
  }
  let finalOutput = sigmoid(z2);

  return { finalOutput: finalOutput, hiddenOutputs: hiddenOutputs };
}