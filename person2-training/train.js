// PERSON 2: Training & Optimization
//
// Depends on: forward(marksNorm, attendanceNorm, weights, bias) and
// normalize(marks, attendance) from person1-math/math-core.js
//
// This file is written against the INTERFACE CONTRACT specified for
// person1's file, not against any specific committed version of it.
// person1-math/math-core.js is expected to export:
//   - normalize(marks, attendance) -> [marksNorm, attendanceNorm]
//   - forward(marksNorm, attendanceNorm, weights, bias) -> probability (0-1)
// If the real file's exports/signatures differ, update the require() and
// the two calls to normalize()/forward() below — the rest of the logic
// (loss averaging, gradient descent) does not need to change.
//
// Dataset row shape assumed: { marks, attendance, passed }
//   where marks/attendance are raw 0-100 values and passed is 0 or 1.
// weights is [w_marks, w_attendance], bias is a plain number.

const { normalize, forward } = require('../person1-math/math-core.js');

function predict(row, weights, bias) {
    const [marksNorm, attendanceNorm] = normalize(row.marks, row.attendance);
    return forward(marksNorm, attendanceNorm, weights, bias);
}

// 1. calculateLoss — average squared error across the whole dataset
function calculateLoss(dataset, weights, bias) {
    let totalError = 0;

    for (const row of dataset) {
        const prediction = predict(row, weights, bias);
        const error = prediction - row.passed;
        totalError += error * error;
    }

    return totalError / dataset.length;
}

// 2. train — runs gradient descent, returns { weights, bias, lossHistory }
function train(dataset, epochs, learningRate) {
    let weights = [0, 0]; // [w_marks, w_attendance], start at zero
    let bias = 0;
    const lossHistory = [];

    for (let epoch = 0; epoch < epochs; epoch++) {
        let gradWMarks = 0;
        let gradWAttendance = 0;
        let gradBias = 0;

        for (const row of dataset) {
            const [marksNorm, attendanceNorm] = normalize(row.marks, row.attendance);
            const prediction = forward(marksNorm, attendanceNorm, weights, bias);
            const error = prediction - row.passed;

            // derivative of sigmoid: output * (1 - output)
            const sigmoidDerivative = prediction * (1 - prediction);
            const delta = error * sigmoidDerivative;

            gradWMarks += delta * marksNorm;
            gradWAttendance += delta * attendanceNorm;
            gradBias += delta;
        }

        const n = dataset.length;
        weights = [
            weights[0] - learningRate * (gradWMarks / n),
            weights[1] - learningRate * (gradWAttendance / n),
        ];
        bias = bias - learningRate * (gradBias / n);

        lossHistory.push(calculateLoss(dataset, weights, bias));
    }

    return { weights, bias, lossHistory };
}

module.exports = { calculateLoss, train };