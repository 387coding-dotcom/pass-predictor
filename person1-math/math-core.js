// PERSON 1: Data & Forward Pass
//
// Plain browser globals (no bundler/import-export in this project —
// see index.html script order). Signatures match the contract in the
// README exactly, since person2-training/train.js and
// person3-diagram/diagram.js are both already written against it:
//   normalize(marks, attendance) -> [marksNorm, attendanceNorm]
//   forward(marksNorm, attendanceNorm, weights, bias) -> probability (0-1)
// weights = [w_marks, w_attendance], bias = single number.

const dataset = [
  { marks: 67, attendance: 66, passed: 1 },
  { marks: 93, attendance: 79, passed: 1 },
  { marks: 80, attendance: 78, passed: 1 },
  { marks: 62, attendance: 41, passed: 0 },
  { marks: 24, attendance: 46, passed: 0 },
  { marks: 43, attendance: 100, passed: 1 },
  { marks: 77, attendance: 77, passed: 1 },
  { marks: 49, attendance: 48, passed: 0 },
  { marks: 28, attendance: 93, passed: 0 },
  { marks: 88, attendance: 89, passed: 1 },
  { marks: 56, attendance: 50, passed: 0 },
  { marks: 87, attendance: 33, passed: 1 },
  { marks: 81, attendance: 97, passed: 1 },
  { marks: 84, attendance: 38, passed: 1 },
  { marks: 47, attendance: 75, passed: 0 },
  { marks: 24, attendance: 49, passed: 0 },
  { marks: 60, attendance: 84, passed: 1 },
  { marks: 42, attendance: 66, passed: 0 },
  { marks: 20, attendance: 70, passed: 0 },
  { marks: 64, attendance: 76, passed: 1 },
  { marks: 76, attendance: 90, passed: 1 },
  { marks: 85, attendance: 46, passed: 1 },
  { marks: 87, attendance: 60, passed: 1 },
  { marks: 93, attendance: 40, passed: 1 },
  { marks: 88, attendance: 50, passed: 1 },
  { marks: 21, attendance: 64, passed: 0 },
  { marks: 22, attendance: 41, passed: 0 },
  { marks: 95, attendance: 47, passed: 1 },
  { marks: 46, attendance: 73, passed: 0 },
  { marks: 79, attendance: 71, passed: 1 },
  { marks: 85, attendance: 73, passed: 1 },
  { marks: 70, attendance: 36, passed: 0 },
  { marks: 42, attendance: 36, passed: 0 },
  { marks: 92, attendance: 98, passed: 1 },
  { marks: 39, attendance: 87, passed: 0 },
  { marks: 38, attendance: 60, passed: 0 },
];

// Rescales an input value from its original range to 0-1
function normalizeValue(value, min, max) {
  return (value - min) / (max - min);
}

// Sigmoid activation — squashes any number into a 0-1 probability
function sigmoid(z) {
  return 1 / (1 + Math.exp(-z));
}

// marks/attendance are raw 0-100 values -> [marksNorm, attendanceNorm]
function normalize(marks, attendance) {
  return [
    normalizeValue(marks, 0, 100),
    normalizeValue(attendance, 0, 100),
  ];
}

// marksNorm/attendanceNorm are already 0-1 (call normalize() first)
function forward(marksNorm, attendanceNorm, weights, bias) {
  const z = weights[0] * marksNorm + weights[1] * attendanceNorm + bias;
  return sigmoid(z);
}