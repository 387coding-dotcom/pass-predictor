
let trainingData = [
  { study: 1, sleep: 1, passed: 0 },
  { study: 2, sleep: 8, passed: 0 },
  { study: 8, sleep: 2, passed: 0 },
  { study: 5, sleep: 5, passed: 1 },
  { study: 6, sleep: 6, passed: 1 },
  { study: 9, sleep: 9, passed: 0 },
  { study: 3, sleep: 3, passed: 0 }
];

function calculateloss(guess,actual){
    let error = guess - actual;
    return error * error;
}
function calculateGradients(study, sleep, guess, actual) {
  let error = guess - actual;
  let dOutput = error * guess * (1 - guess);

  let dw1 = dOutput * study;
  let dw2 = dOutput * sleep;
  let db = dOutput;

  return { dw1, dw2, db };
}

function trainOnOneStudent(student, learningRate) {
  let study = student.study / 10;
  let sleep = student.sleep / 10;

  let result = forward(study, sleep);
  let guess = result.finalOutput;
  let hidden = result.hiddenOutputs;

  // Part 1: how wrong was the final answer? (identical to before)
  let error = guess - student.passed;
  let dOutput = error * guess * (1 - guess);

  // Part 2: send blame backward through W2 into each hidden neuron
  let hiddenBlame = [];
  for (let j = 0; j < 4; j++) {
    hiddenBlame[j] = dOutput * W2[j] * hidden[j] * (1 - hidden[j]);
  }

  // Part 3: update the output neuron's weights
  for (let j = 0; j < 4; j++) {
    W2[j] = W2[j] - learningRate * dOutput * hidden[j];
  }
  b2 = b2 - learningRate * dOutput;

  // Part 4: update each hidden neuron's weights
  for (let j = 0; j < 4; j++) {
    W1[j][0] = W1[j][0] - learningRate * hiddenBlame[j] * study;
    W1[j][1] = W1[j][1] - learningRate * hiddenBlame[j] * sleep;
    b1[j] = b1[j] - learningRate * hiddenBlame[j];
  }
}