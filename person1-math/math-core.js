// PERSON 1: Data & Forward Pass
//
// What this person had to do:
// 1. Create the dataset — a list of student records, each with
//    study hours, sleep hours, and whether they passed (1) or not (0).
// 2. Write normalize() — takes raw study/sleep hours (0-10) and
//    scales them down to a 0-1 range, since the network works better
//    with small numbers.
// 3. Write sigmoid() — a math function that takes any number and
//    squashes it into a probability between 0 and 1.
// 4. Write forward() — takes the normalized study/sleep plus the
//    weights and bias, does the math (multiply, add, run through
//    sigmoid), and returns a final probability of passing.
//
// Signatures match the contract in the README exactly, since
// person2-training/train.js and person3-diagram/diagram.js are both
// already written against it:
//   normalize(study, sleep) -> [studyNorm, sleepNorm]
//   forward(studyNorm, sleepNorm, weights, bias) -> probability (0-1)
// weights = [w_study, w_sleep], bias = single number.

const dataset = [
  { study: 1, sleep: 1, passed: 0 },
  { study: 2, sleep: 8, passed: 0 },
  { study: 8, sleep: 2, passed: 0 },
  { study: 5, sleep: 5, passed: 1 },
  { study: 6, sleep: 6, passed: 1 },
  { study: 9, sleep: 9, passed: 0 },
  { study: 3, sleep: 3, passed: 0 },
  { study: 5, sleep: 6, passed: 1 },
  { study: 6, sleep: 5, passed: 1 },
  { study: 4, sleep: 4, passed: 1 },
  { study: 7, sleep: 7, passed: 1 },
  { study: 4, sleep: 5, passed: 1 },
  { study: 7, sleep: 6, passed: 1 },
  { study: 2, sleep: 2, passed: 0 },
  { study: 9, sleep: 1, passed: 0 },
  { study: 1, sleep: 9, passed: 0 },
  { study: 10, sleep: 10, passed: 0 },
  { study: 3, sleep: 8, passed: 0 },
  { study: 8, sleep: 3, passed: 0 },
  { study: 6, sleep: 7, passed: 1 },
  { study: 4, sleep: 3, passed: 0 },
  { study: 3, sleep: 4, passed: 0 },
  { study: 5, sleep: 4, passed: 1 },
  { study: 1, sleep: 5, passed: 0 },
  { study: 9, sleep: 5, passed: 0 },
];

// Rescales an input value from its original range to 0-1
function normalizeValue(value, min, max) {
  return (value - min) / (max - min);
}

// Sigmoid activation — squashes any number into a 0-1 probability
function sigmoid(z) {
  return 1 / (1 + Math.exp(-z));
}

// study/sleep are raw 0-10 values -> [studyNorm, sleepNorm]
function normalize(study, sleep) {
  return [
    normalizeValue(study, 0, 10),
    normalizeValue(sleep, 0, 10),
  ];
}

// studyNorm/sleepNorm are already 0-1 (call normalize() first)
function forward(studyNorm, sleepNorm, weights, bias) {
  const z = weights[0] * studyNorm + weights[1] * sleepNorm + bias;
  return sigmoid(z);
}