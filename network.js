function sigmoid(z){
    return 1/(1+ Math.exp(-z));
}
function randomWeight() {
  return Math.random() * 0.8 - 0.4;
}

let W1 = [
  [randomWeight(), randomWeight()],
  [randomWeight(), randomWeight()],
  [randomWeight(), randomWeight()],
  [randomWeight(), randomWeight()]
];
let b1 = [randomWeight(), randomWeight(), randomWeight(), randomWeight()];

let W2 = [randomWeight(), randomWeight(), randomWeight(), randomWeight()];
let b2 = randomWeight();

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