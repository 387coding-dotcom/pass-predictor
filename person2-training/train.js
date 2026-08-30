// PERSON 2: Training & Optimization
//
// Implement:
// 1. calculateLoss(dataset, weights, bias) — returns a single number,
//    the average squared error across the whole dataset.
//
// 2. train(dataset, epochs, learningRate) — runs gradient descent and
//    returns { weights, bias, lossHistory }, where lossHistory is an
//    array of loss values, one per epoch (should trend downward).
//
// Depends on: forward() and normalize() from person1-math/math-core.js