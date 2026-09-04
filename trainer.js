
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
  let guess = forward(student.study / 10, student.sleep / 10);
  let grads = calculateGradients(student.study / 10, student.sleep / 10, guess, student.passed);

  w1 = w1 - learningRate * grads.dw1;
  w2 = w2 - learningRate * grads.dw2;
  b  = b  - learningRate * grads.db;
}
function trainEpoch(learningRate) {
  let totalLoss = 0;

  for (let i = 0; i < trainingData.length; i++) {
    let student = trainingData[i];
    let guess = forward(student.study, student.sleep);
    totalLoss += calculateloss(guess, student.passed);
    trainOnOneStudent(student, learningRate);
  }

  let averageLoss = totalLoss / trainingData.length;
  return averageLoss;
}