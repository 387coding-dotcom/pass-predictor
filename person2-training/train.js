// PERSON 2: Training & Optimization
//
// What this person had to do:
// 1. Write a loss function — measures how wrong the model's
//    predictions are compared to the actual pass/fail results
//    (using mean squared error, averaged across the whole dataset).
// 2. Write train() — runs gradient descent: repeatedly makes
//    predictions, checks the error, and nudges the weights and bias
//    in the direction that reduces that error, over many epochs.
// 3. Make training progress available — return the loss for every
//    epoch (lossHistory) so the UI can plot how the error drops
//    over time as training happens.
//
// Depends on normalize() and forward() from person1-math/math-core.js,
// loaded first as plain browser globals (no bundler/require in this
// project — see index.html script order).
//
// weights = [w_marks, w_attendance], bias = single number.

function predict(row, weights, bias) {
    const [marksNorm, attendanceNorm] = normalize(row.marks, row.attendance);
    return forward(marksNorm, attendanceNorm, weights, bias);
}

// average squared error across the whole dataset
function calculateLoss(dataset, weights, bias) {
    let totalError = 0;

    for (const row of dataset) {
        const prediction = predict(row, weights, bias);
        const error = prediction - row.passed;
        totalError += error * error;
    }

    return totalError / dataset.length;
}

// runs gradient descent, returns { weights, bias, lossHistory }
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